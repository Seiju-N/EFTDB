// Joins json.tarkov.dev's flat, ID-referencing datasets into the shapes
// EFTDB's components expect (the joins GraphQL used to resolve server-side).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

import {
  Barter,
  Category,
  GameMap,
  Item,
  ItemRef,
  PriceHistoryPoint,
  Rewards,
  ServerStatus,
  Task,
  TaskObjective,
  Trader,
} from "./types";

const toArray = <T,>(obj: Record<string, T> | T[] | undefined | null): T[] =>
  !obj ? [] : Array.isArray(obj) ? obj : Object.values(obj);

export const normalizeCategories = (itemsRaw: Raw): Category[] => {
  const rawCategories = itemsRaw.itemCategories as Record<string, Raw>;
  const byId = new Map<string, Raw>(Object.entries(rawCategories));
  return Object.values(rawCategories).map((c) => {
    const parent = c.parent ? byId.get(c.parent) : undefined;
    return {
      id: c.id,
      name: c.name,
      normalizedName: c.normalizedName,
      parent: parent ? { name: parent.name, normalizedName: parent.normalizedName } : null,
      children: [],
    };
  });
};

export const normalizeTraders = (tradersRaw: Raw): Trader[] =>
  toArray(tradersRaw).map((t: Raw) => ({
    id: t.id,
    name: t.name,
    imageLink: t.imageLink,
    normalizedName: t.normalizedName,
  }));

const buildItemRefIndex = (itemsRaw: Raw, categoriesById: Map<string, Raw>): Map<string, ItemRef> => {
  const index = new Map<string, ItemRef>();
  Object.values(itemsRaw.items as Record<string, Raw>).forEach((item: Raw) => {
    const categoryId = item.categories?.[0];
    const categoryRaw = categoryId ? categoriesById.get(categoryId) : undefined;
    const category = categoryRaw ? { name: categoryRaw.name } : null;
    index.set(item.id, { id: item.id, name: item.name, iconLink: item.iconLink, category });
  });
  // Quest items live in a separate pool (tasks dataset) but are referenced the
  // same way from task objectives, so callers can merge them into this index.
  return index;
};

const mergeQuestItemRefs = (index: Map<string, ItemRef>, questItemsRaw: Raw) => {
  toArray(questItemsRaw).forEach((qi: Raw) => {
    index.set(qi.id, { id: qi.id, name: qi.name, iconLink: qi.iconLink, category: null });
  });
};

export const normalizeItems = (itemsRaw: Raw, tradersRaw: Raw, bartersRaw: Raw, tasksRaw: Raw): Item[] => {
  const categoriesById = new Map<string, Raw>(Object.entries(itemsRaw.itemCategories as Record<string, Raw>));
  const tradersById = new Map<string, Raw>((toArray(tradersRaw) as Raw[]).map((t) => [t.id, t]));
  const itemRefIndex = buildItemRefIndex(itemsRaw, categoriesById);

  const bartersByOfferedItem = new Map<string, Raw[]>();
  toArray(bartersRaw).forEach((barter: Raw) => {
    const targetId = barter.offeredItem?.item;
    if (!targetId) return;
    const list = bartersByOfferedItem.get(targetId) ?? [];
    list.push(barter);
    bartersByOfferedItem.set(targetId, list);
  });

  const tasksByRequiredItem = new Map<string, Raw[]>();
  toArray(tasksRaw.tasks).forEach((task: Raw) => {
    const referencedIds = new Set<string>();
    (task.objectives || []).forEach((objective: Raw) => {
      (objective.items || []).forEach((id: string) => referencedIds.add(id));
      if (objective.questItem) referencedIds.add(objective.questItem);
      if (objective.markerItem) referencedIds.add(objective.markerItem);
      if (objective.item) referencedIds.add(objective.item);
    });
    referencedIds.forEach((id) => {
      const list = tasksByRequiredItem.get(id) ?? [];
      list.push(task);
      tasksByRequiredItem.set(id, list);
    });
  });

  return Object.values(itemsRaw.items as Record<string, Raw>).map((raw: Raw): Item => {
    const categoryId = raw.categories?.[0];
    const categoryRaw = categoryId ? categoriesById.get(categoryId) : undefined;
    const category = categoryRaw ? { name: categoryRaw.name, normalizedName: categoryRaw.normalizedName } : null;

    const toItemPrice = (offer: Raw): ItemPriceLike => ({
      price: offer.price,
      vendor: { name: tradersById.get(offer.trader)?.name ?? offer.trader },
      currency: offer.currency,
      priceRUB: offer.priceRUB,
      minTraderLevel: offer.minTraderLevel,
      taskUnlock: offer.taskUnlock
        ? { id: offer.taskUnlock, name: tasksRaw.tasks?.[offer.taskUnlock]?.name ?? offer.taskUnlock }
        : null,
    });

    const sellFor = (raw.sellToTrader || []).map(toItemPrice);
    if (raw.lastLowPrice) {
      sellFor.push({ price: raw.lastLowPrice, vendor: { name: "Flea Market" }, currency: "RUB", priceRUB: raw.lastLowPrice });
    }
    const buyFor = (raw.buyFromTrader || []).map(toItemPrice);

    const bartersFor: Barter[] = (bartersByOfferedItem.get(raw.id) || []).map((barter: Raw) => ({
      level: barter.minTraderLevel,
      requiredItems: (barter.requiredItems || []).map((ri: Raw) => ({
        attributes: [],
        count: ri.count,
        item: {
          name: itemRefIndex.get(ri.item)?.name ?? ri.item,
          iconLink: itemRefIndex.get(ri.item)?.iconLink,
        },
        quantity: ri.count,
      })),
      trader: { name: tradersById.get(barter.trader)?.name ?? barter.trader },
      taskUnlock: barter.taskUnlock ? { id: barter.taskUnlock, name: barter.taskUnlock } : null,
    }));

    const usedInTasks = (tasksByRequiredItem.get(raw.id) || []).map((task: Raw) => ({
      id: task.id,
      name: task.name,
      trader: { name: tradersById.get(task.trader)?.name ?? task.trader },
    }));

    return {
      ...raw,
      category,
      sellFor,
      buyFor,
      bartersFor,
      usedInTasks,
    };
  });
};

type ItemPriceLike = {
  price: number;
  vendor: { name: string };
  currency: string;
  priceRUB: number;
  minTraderLevel?: number;
  taskUnlock?: { id: string; name: string } | null;
};

const objectiveItemId = (objective: Raw): string | undefined => {
  if (objective.items?.length) return objective.items[0];
  if (objective.questItem) return objective.questItem;
  if (objective.item) return objective.item;
  return undefined;
};

export const normalizeTasks = (
  tasksRaw: Raw,
  itemsRaw: Raw,
  tradersRaw: Raw,
  mapsRaw: Raw
): Task[] => {
  const categoriesById = new Map<string, Raw>(Object.entries(itemsRaw.itemCategories as Record<string, Raw>));
  const itemRefIndex = buildItemRefIndex(itemsRaw, categoriesById);
  mergeQuestItemRefs(itemRefIndex, tasksRaw.questItems);
  const tradersById = new Map<string, Raw>((toArray(tradersRaw) as Raw[]).map((t) => [t.id, t]));
  const mapsById = new Map<string, Raw>(Object.entries((mapsRaw?.maps || {}) as Record<string, Raw>));

  const traderRef = (id: string) => ({ id, name: tradersById.get(id)?.name ?? id });

  const toReward = (raw: Raw): Rewards => ({
    traderStanding: (raw?.traderStanding || []).map((r: Raw) => ({ trader: traderRef(r.trader), standing: r.standing })),
    items: (raw?.items || []).map((r: Raw) => ({
      item: itemRefIndex.get(r.item) ?? { id: r.item, name: r.item },
      count: r.count,
    })),
    offerUnlock: (raw?.offerUnlock || []).map((r: Raw) => ({
      item: itemRefIndex.get(r.item) ?? { id: r.item, name: r.item },
      count: r.count,
    })),
    skillLevelReward: (raw?.skillLevelReward || []).map((r: Raw) => ({ name: r.name, level: r.level })),
    traderUnlock: (raw?.traderUnlock || []).map((id: string) => ({ id, name: tradersById.get(id)?.name ?? id })),
  });

  return toArray(tasksRaw.tasks).map((raw: Raw): Task => {
    const objectives: TaskObjective[] = (raw.objectives || []).map((o: Raw) => {
      const base: TaskObjective = {
        id: o.id,
        description: o.description,
        optional: o.optional,
        type: o.type,
        count: o.count,
      };
      if (o.type === "buildWeapon") {
        base.item = o.item ? itemRefIndex.get(o.item) : undefined;
        base.attributes = o.buildAttributes || [];
        base.containsAll = (o.containsAll || []).map((id: string) => itemRefIndex.get(id)).filter(Boolean) as ItemRef[];
        base.containsCategory = (o.containsCategory || [])
          .map((id: string) => {
            const cat = categoriesById.get(id);
            return cat ? { name: cat.name } : null;
          })
          .filter(Boolean) as { name: string }[];
      } else {
        const refId = objectiveItemId(o);
        if (refId) base.item = itemRefIndex.get(refId);
      }
      return base;
    });

    const mapRaw = raw.map ? mapsById.get(raw.map) : undefined;

    return {
      ...raw,
      trader: traderRef(raw.trader),
      map: mapRaw ? { name: mapRaw.name } : null,
      objectives,
      neededKeys: (raw.neededKeys || []).map((nk: Raw) => ({
        keys: (nk.keys || []).map((id: string) => itemRefIndex.get(id)).filter(Boolean) as ItemRef[],
      })),
      taskRequirements: (raw.taskRequirements || []).map((tr: Raw) => {
        const reqTask = tasksRaw.tasks[tr.task];
        return {
          task: { id: tr.task, name: reqTask?.name ?? tr.task, trader: { name: tradersById.get(reqTask?.trader)?.name } },
          status: tr.status?.[0] ?? null,
        };
      }),
      traderRequirements: (raw.traderRequirements || []).map((tr: Raw) => ({ trader: traderRef(tr.trader), value: tr.value })),
      startRewards: toReward(raw.startRewards),
      finishRewards: toReward(raw.finishRewards),
    };
  });
};

export const normalizeMaps = (mapsRaw: Raw): GameMap[] => {
  const mobsById = new Map<string, Raw>(Object.entries((mapsRaw.mobs || {}) as Record<string, Raw>));
  return toArray(mapsRaw.maps).map((map: Raw) => ({
    name: map.name,
    bosses: ((map.bosses || [])
      .map((b: Raw) => {
        const mob = mobsById.get(b.mob);
        return mob ? { b, mob } : null;
      })
      .filter(Boolean) as { b: Raw; mob: Raw }[])
      .map(({ b, mob }) => ({
        boss: {
          name: mob.name,
          imagePortraitLink: mob.imagePortraitLink,
          imagePosterLink: mob.imagePosterLink,
        },
        spawnChance: b.spawnChance,
        spawnLocations: (b.spawnLocations || []).map((loc: Raw) => ({ name: loc.name, chance: loc.chance })),
      })),
  }));
};

export const normalizeStatus = (statusRaw: Raw): ServerStatus => ({
  generalStatus: statusRaw.generalStatus,
  currentStatuses: statusRaw.currentStatuses || [],
  messages: statusRaw.messages || [],
});

export const normalizePriceHistory = (raw: Raw): PriceHistoryPoint[] =>
  toArray(raw).map((point: Raw) => ({ price: point.price, timestamp: String(point.timestamp) }));
