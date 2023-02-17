export const ARMOR_MATERIAL = [
  {
    name: "超高分子量ポリエチレン",
    id: "UHMWPE",
  },
  {
    name: "アラミド",
    id: "Aramid",
  },
  {
    name: "複合素材",
    id: "Combined",
  },
  {
    name: "チタン",
    id: "Titan",
  },
  {
    name: "アルミニウム",
    id: "Aluminium",
  },
  {
    name: "鋼",
    id: "ArmoredSteel",
  },
  {
    name: "セラミック",
    id: "Ceramic",
  },
  {
    name: "ガラス",
    id: "Glass",
  },
];

export const ITEM_PROPERTIES = {
  name: "アイテム名",
  basePrice: "基準価格",
  usedInTasks: "タスクでの使用",
  width: "幅",
  height: "高さ",
  avg24hPrice: "平均価格(24h)",
};

export const ITEM_PROPERTIES_AMMO = {
  damage: "ダメージ",
  armorDamage: "アーマーダメージ",
  fragmentationChance: "破砕率",
  ricochetChance: "跳弾率",
  penetrationChance: "貫通率",
  penetrationPower: "貫通力",
  accuracyModifier: "精度",
  recoilModifier: "リコイル",
  initialSpeed: "初速",
  lightBleedModifier: "軽度出血率",
  heavyBleedModifier: "重度出血率",
  durabilityBurnFactor: "耐久消費率",
  heatFactor: "HEAT",
};

export const ITEM_PROPERTIES_ARMOR = {
  class: "アーマークラス",
  durability: "耐久",
  ergoPenalty: "エルゴペナルティ",
  material: "素材",
  repairCost: "修理コスト",
  speedPenalty: "移動速度ペナルティ",
  turnPenalty: "振向きペナルティ",
};

export const ITEM_PROPERTIES_ARMOR_ATTACHMENT = {
  blindnessProtection: "フラッシュ耐性",
  class: "アーマークラス",
  durability: "耐久",
  ergoPenalty: "エルゴペナルティ",
  headZones: "保護部位",
  material: "素材",
  repairCost: "修理コスト",
  speedPenalty: "移動速度ペナルティ",
  turnPenalty: "振向きペナルティ",
};

export const ITEM_PROPERTIES_BACKPACK = {
  capacity: "容量",
  grid: "構造",
};

export const ITEM_PROPERTIES_BARREL = {
  centerOfImpact: "集弾姓",
  deviationCurve: "deviationCurve",
  deviationMax: "deviationMax",
  ergonomics: "エルゴノミクス",
  recoilModifier: "リコイル",
};

export const ITEM_PROPERTIES_CHEST_RIG = {
  capacity: "容量",
  class: "アーマークラス",
  durability: "耐久",
  ergoPenalty: "エルゴペナルティ",
  material: "素材",
  repairCost: "修理コスト",
  speedPenalty: "移動速度ペナルティ",
  turnPenalty: "振向きペナルティ",
};

export const ITEM_PROPERTIES_CONTAINER = {
  capacity: "容量",
  grid: "構造",
};

export const ITEM_PROPERTIES_FOOD_DRINK = {
  energy: "エネルギー",
  hydration: "水分",
  units: "units",
};

export const ITEM_PROPERTIES_GLASSES = {
  blindnessProtection: "フラッシュ耐性",
  class: "アーマークラス",
  durability: "耐久",
  material: "素材",
  repairCost: "修理コスト",
};

export const ITEM_PROPERTIES_GRENADE = {
  contusionRadius: "ダメージ半径",
  fragments: "破片",
  fuse: "遅延",
  maxExplosionDistance: "最大爆発距離",
  minExplosionDistance: "最小爆発距離",
  type: "type",
};

export const ITEM_PROPERTIES_HELMET = {
  blindnessProtection: "フラッシュ耐性",
  blocksHeadset: "ヘッドセット",
  class: "アーマークラス",
  deafening: "聴覚阻害",
  durability: "耐久",
  ergoPenalty: "エルゴペナルティ",
  headZones: "保護部位",
  material: "素材",
  repairCost: "修理コスト",
  ricochetX: "ricochetX",
  ricochetY: "ricochetY",
  ricochetZ: "ricochetZ",
  slots: "slots",
  speedPenalty: "移動速度ペナルティ",
  turnPenalty: "振向きペナルティ",
};

export const ITEM_PROPERTIES_KEY = {
  uses: "使用可能回数",
};

export const ITEM_PROPERTIES_MAGAZINE = {
  allowedAmmo: "使用可能弾薬",
  ammoCheckModifier: "チェック速度",
  capacity: "容量",
  ergonomics: "エルゴノミクス",
  loadModifier: "ロード速度",
  malfunctionChance: "誤作動率",
  recoilModifier: "リコイル",
  slots: "slots",
};

export const ITEM_PROPERTIES_MEDKIT = {
  cures: "cures",
  hitpoints: "HP",
  hpCostHeavyBleeding: "止血コスト(重度)",
  hpCostLightBleeding: "止血コスト(軽度)",
  maxHealPerUse: "最大回復/1使用",
  useTime: "使用時間",
};

export const ITEM_PROPERTIES_MEDICAL_ITEM = {
  cures: "cures",
  useTime: "使用時間",
  uses: "使用可能回数",
};

export const ITEM_PROPERTIES_MELEE = {
  hitRadius: "攻撃可能半径",
  slashDamage: "斬撃ダメージ",
  stabDamage: "刺突ダメージ",
};

export const ITEM_PROPERTIES_NIGHT_VISION = {
  diffuseIntensity: "diffuseIntensity",
  intensity: "intensity",
  noiseIntensity: "noiseIntensity",
  noiseScale: "noiseScale",
};

export const ITEM_PROPERTIES_PAINKILLER = {
  cures: "cures",
  energyImpact: "エネルギー消費",
  hydrationImpact: "水分消費",
  painkillerDuration: "持続時間",
  useTime: "使用時間",
  uses: "使用可能回数",
};

export const ITEM_PROPERTIES_PRESET = {
  baseItem: "ベースアイテム",
  ergonomics: "エルゴノミクス",
  moa: "MOA",
  recoilHorizontal: "水平反動",
  recoilVertical: "垂直反動",
};

export const ITEM_PROPERTIES_SCOPE = {
  ergonomics: "エルゴノミクス",
  recoilModifier: "リコイル",
  sightModes: "照準モード",
  sightingRange: "照準範囲",
  slots: "slots",
  zoomLevels: "ズームレベル",
};

export const ITEM_PROPERTIES_STIM = {
  cures: "cures",
  stimEffects: "使用効果",
  useTime: "使用時間",
};

export const ITEM_PROPERTIES_SURGICAL_KIT = {
  cures: "cures",
  maxLimbHealth: "部位最大HP",
  minLimbHealth: "部位最小HP",
  useTime: "使用時間",
  uses: "使用可能回数",
};

export const ITEM_PROPERTIES_WEAPON = {
  allowedAmmo: "使用可能弾薬",
  caliber: "口径",
  centerOfImpact: "集弾姓",
  defaultAmmo: "弾薬(default)",
  defaultErgonomics: "エルゴノミクス(default)",
  defaultHeight: "高さ(default)",
  defaultPreset: "プリセット(default)",
  defaultRecoilHorizontal: "水平反動(default)",
  defaultRecoilVertical: "垂直反動(default)",
  defaultWeight: "重さ(default)",
  defaultWidth: "幅(default)",
  deviationCurve: "deviationCurve",
  deviationMax: "deviationMax",
  effectiveDistance: "有効射程",
  ergonomics: "エルゴノミクス",
  fireModes: "射撃モード",
  fireRate: "射撃レート",
  maxDurability: "最大耐久",
  presets: "プリセット",
  recoilHorizontal: "水平反動",
  recoilVertical: "垂直反動",
  repairCost: "修理コスト",
  sightingRange: "照準可能距離",
  slots: "slots",
};

export const ITEM_PROPERTIES_WEAPON_MOD = {
  accuracyModifier: "精度",
  ergonomics: "エルゴノミクス",
  recoilModifier: "リコイル",
};
