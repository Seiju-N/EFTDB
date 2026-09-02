// Hand-written types for the data shapes normalize.ts produces from
// json.tarkov.dev. These intentionally use index signatures rather than
// modeling every field of the live game schema — json.tarkov.dev exposes
// far more than the old GraphQL schema.graphql snapshot did (armor plates,
// prestige, achievements, ...), and EFTDB's components already read
// everything through optional chaining. Precisely modeling every field
// would just be busywork the components don't rely on.

export type Vendor = { name: string };

export type ItemPrice = {
  price: number;
  vendor: Vendor;
  currency: string;
  priceRUB: number;
  minTraderLevel?: number;
  taskUnlock?: { id: string; name: string } | null;
};

export type ItemRef = {
  id: string;
  name: string;
  iconLink?: string | null;
  category?: { name: string } | null;
};

export type Category = {
  id: string;
  name: string;
  normalizedName: string;
  parent: { name: string; normalizedName: string } | null;
  children: never[];
};

export type BarterRequiredItem = {
  attributes: { name: string; type: string; value?: string | null }[];
  count: number;
  item: { name: string; iconLink?: string | null };
  quantity: number;
};

export type Barter = {
  level: number;
  requiredItems: BarterRequiredItem[];
  trader: Vendor;
  taskUnlock: { id: string; name: string } | null;
};

export type TraderRef = { id: string; name: string };

export type Trader = TraderRef & {
  imageLink?: string | null;
  normalizedName?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Item = {
  id: string;
  name: string;
  normalizedName: string;
  shortName: string;
  category: { name: string; normalizedName: string } | null;
  bartersFor: Barter[];
  basePrice: number;
  width: number;
  height: number;
  weight: number;
  image512pxLink?: string | null;
  iconLink?: string | null;
  wikiLink?: string | null;
  usedInTasks: { id: string; name: string; trader: Vendor }[];
  sellFor: ItemPrice[];
  buyFor: ItemPrice[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any;
  avg24hPrice?: number | null;
  low24hPrice?: number | null;
  high24hPrice?: number | null;
  changeLast48h?: number | null;
  changeLast48hPercent?: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type RewardItem = { item: ItemRef; count: number };
export type TraderStandingReward = { trader: TraderRef; standing: number };

export type Rewards = {
  traderStanding: TraderStandingReward[];
  items: RewardItem[];
  offerUnlock: RewardItem[];
  skillLevelReward: { name: string; level: number }[];
  traderUnlock: { id: string; name: string }[];
};

export type TaskObjective = {
  id: string;
  description: string;
  optional: boolean;
  type: string;
  count?: number;
  item?: ItemRef;
  containsAll?: ItemRef[];
  containsCategory?: { name: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type Task = {
  id: string;
  name: string;
  normalizedName: string;
  taskImageLink?: string | null;
  wikiLink?: string | null;
  trader: TraderRef;
  map: { name: string } | null;
  objectives: TaskObjective[];
  neededKeys: { keys: ItemRef[] }[];
  taskRequirements: { task: { id: string; name: string; trader: Vendor }; status: string | null }[];
  traderRequirements: { trader: TraderRef; value: number }[];
  minPlayerLevel?: number;
  kappaRequired?: boolean;
  lightkeeperRequired?: boolean;
  factionName?: string;
  startRewards: Rewards;
  finishRewards: Rewards;
};

export type BossSpawnLocation = { name: string; chance: number };
export type MapBoss = {
  boss: { name: string; imagePortraitLink?: string | null; imagePosterLink?: string | null };
  spawnChance: number;
  spawnLocations: BossSpawnLocation[];
};
export type GameMap = { name: string; bosses: MapBoss[] };

export type StatusMessage = {
  content: string;
  solveTime: string | null;
  statusCode: string;
  time: string;
  type: string;
};
export type ServerStatus = {
  generalStatus: { name: string; message: string; status: number; statusCode: string };
  currentStatuses: { name: string; message?: string; status: number; statusCode: string }[];
  messages: StatusMessage[];
};

export type PriceHistoryPoint = { price: number; timestamp: string };
