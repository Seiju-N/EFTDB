import { LanguageCode } from "@/graphql/generated";
import { toPascalCase } from "@/utils";
import { fetchDataset, useAsync } from "./jsonClient";
import {
  normalizeCategories,
  normalizeItems,
  normalizeMaps,
  normalizePriceHistory,
  normalizeStatus,
  normalizeTasks,
  normalizeTraders,
} from "./normalize";
import { GameMap, Item, ItemPrice, PriceHistoryPoint, ServerStatus, Task, Trader } from "./types";
import type { Category } from "./types";

export const useTraders = (lang: LanguageCode) =>
  useAsync<{ traders: Trader[] }>(async () => {
    const raw = await fetchDataset("regular/traders", lang);
    return { traders: normalizeTraders(raw) };
  }, [lang]);

export const useItemCategories = (lang: LanguageCode) =>
  useAsync<{ itemCategories: Category[] }>(async () => {
    const itemsRaw = await fetchDataset("regular/items", lang);
    return { itemCategories: normalizeCategories(itemsRaw) };
  }, [lang]);

export const useTasks = (lang: LanguageCode) =>
  useAsync<{ tasks: Task[] }>(async () => {
    const [tasksRaw, itemsRaw, tradersRaw, mapsRaw] = await Promise.all([
      fetchDataset("regular/tasks", lang),
      fetchDataset("regular/items", lang),
      fetchDataset("regular/traders", lang),
      fetchDataset("regular/maps", lang),
    ]);
    return { tasks: normalizeTasks(tasksRaw, itemsRaw, tradersRaw, mapsRaw) };
  }, [lang]);

export const useItems = (lang: LanguageCode, categoryName?: string) =>
  useAsync<{ items: Item[] }>(async () => {
    const [itemsRaw, tradersRaw, bartersRaw, tasksRaw] = await Promise.all([
      fetchDataset("regular/items", lang),
      fetchDataset("regular/traders", lang),
      fetchDataset("regular/barters", lang),
      fetchDataset("regular/tasks", lang),
    ]);
    const items = normalizeItems(itemsRaw, tradersRaw, bartersRaw, tasksRaw);
    const filtered = categoryName
      ? items.filter((item) => toPascalCase(item.category?.normalizedName) === categoryName)
      : items;
    return { items: filtered };
  }, [lang, categoryName]);

export const useServerStatus = () =>
  useAsync<{ status: ServerStatus }>(async () => {
    const raw = await fetchDataset("status", "en");
    return { status: normalizeStatus(raw) };
  }, []);

export const useBossSpawns = (lang: LanguageCode) =>
  useAsync<{ maps: GameMap[] }>(async () => {
    const raw = await fetchDataset("regular/maps", lang);
    return { maps: normalizeMaps(raw) };
  }, [lang]);

export const useItemPrices = (ids: string[], lang: LanguageCode = LanguageCode.En) =>
  useAsync<{ items: Item[] }>(async () => {
    const [itemsRaw, tradersRaw, bartersRaw, tasksRaw] = await Promise.all([
      fetchDataset("regular/items", lang),
      fetchDataset("regular/traders", lang),
      fetchDataset("regular/barters", lang),
      fetchDataset("regular/tasks", lang),
    ]);
    const items = normalizeItems(itemsRaw, tradersRaw, bartersRaw, tasksRaw);
    const idSet = new Set(ids);
    return { items: items.filter((item) => idSet.has(item.id)) };
  }, [ids.join(","), lang]);

export const usePriceHistory = (itemId: string) =>
  useAsync<{ historicalItemPrices: PriceHistoryPoint[] }>(async () => {
    const raw = await fetchDataset(`regular/prices/${itemId}`, "en");
    return { historicalItemPrices: normalizePriceHistory(raw) };
  }, [itemId]);

export const useItemProperties = (itemId: string, lang: LanguageCode) =>
  useAsync<{ item: { properties: ItemProperties } }>(async () => {
    const itemsRaw = await fetchDataset("regular/items", lang);
    const raw = itemsRaw.items[itemId];
    return { item: { properties: raw?.properties ?? null } };
  }, [itemId, lang]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ItemProperties = any;

export type { ItemPrice };
