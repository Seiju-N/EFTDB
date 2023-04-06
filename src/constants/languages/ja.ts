const JA_DICT = {
  HOME_SENTENCE: {
    welcome_msg: "Welcome to",
    discord_server: "Discordサーバーに参加",
    search_item: "アイテムを検索",
    search_task: "タスクを検索",
    server_status: {
      "title": "サーバー状況",
      "Website": "ウェブサイト",
      "Forum": "フォーラム",
      "Authentication": "ログイン認証",
      "Launcher": "ランチャー",
      "Group lobby": "グループロビー",
      "Trading": "取引",
      "Matchmaking": "マッチメイキング",
      "Friends and msg.": "フレンド/メッセージ",
      "Inventory operations": "インベントリ",
      "Global": "グローバル",
    },
    boss_spawns: {
      "title": "ボススポーン率",
    },
    price_tracker: {
      "title": "価格推移(48h)",
      "dialog_title": "リストを初期化します。",
      "dialog_description": "価格推移リストをデフォルト状態に戻します。続行しますか?",
      "trader_price": "トレーダー販売価格",
    },
    subtitle: {
      subtitle1: "EFTDBは以下を提供します。",
      simple: {
        primary: "シンプルさ",
        secondary: "余分な情報は排除します。",
      },
      accurate: {
        primary: "正確さ",
        secondary: "正確な情報を提供します。",
      },
      fast: {
        primary: "素早さ",
        secondary: "フレッシュな情報を提供します。",
      }
    }
  },

  FOOTER_SENTENCE: {
    report: "バグや要望はGithubのissues、もしくはDiscord(boru#4555)へお願いします。",
    donate: "サービス向上と維持のためにご支援をお願いします。",
  },

  TASK_COLUMN: {
    Name: "タスク名",
    Experience: "経験値",
    Map: "マップ",
    TraderName: "トレーダー",
    KappaRequired: "kappaRequired",
    LightkeeperRequired: "lightkeeperRequired",
  },

  TASK_DETAIL_DIALOG: {
    Objective: "目標",
    Requirements: "必要条件",
    StartRewards: "開始時報酬",
    FinishRewards: "完了時報酬",
    Reputation: "友好度",
    Rewards: "報酬",
    PlayerLevelRequirements: "プレイヤーレベル",
    TaskRequirements: "前提タスク",
    NeededKeys: "必要な鍵",
    StartRewardsItems: "開始時報酬アイテム",
  },

  OPERATORS: {
    "=": "=",
    ">": "greater than",
    "<": "less than",
    ">=": "以上",
    "<=": "以下",
  },

  TASK_STATUS: {
    complete: "完了",
  },

  ITEM_DETAIL_DIALOG: {
    SIZE: "サイズ",
    NO_DETAIL: "詳細はありません。",
    WIDTH: "幅",
    HEIGHT: "高さ",
    WEIGHT: "重量"
  },

  MENU_SENTENCE: {
    task: "タスク",
    item: "アイテム",
    taskMarker: "タスクマーカー",
  },

  ITEM_TYPE: {
    Ammo: "弾薬",
    AmmoBox: "弾薬パック",
    Any: "全て",
    Armor: "アーマー",
    Backpack: "バックパック",
    Barter: "取引アイテム",
    Container: "コンテナ",
    Glasses: "アイウェア",
    Grenade: "グレネード",
    Gun: "武器",
    Headphones: "ヘッドフォン",
    Helmet: "ヘルメット",
    Injectors: "注射器",
    Keys: "鍵",
    MarkedOnly: "markedOnly",
    Meds: "医療品",
    Mods: "パーツ",
    NoFlea: "取引不可アイテム",
    PistolGrip: "ピストルグリップ",
    Preset: "武器プリセット",
    Provisions: "食料品",
    Rig: "リグ",
    Suppressor: "サプレッサー",
    Wearable: "衣料品",
  },

  ITEM_CATEGORY_NAME: {
    Ammo: "弾薬",
    AmmoContainer: "弾薬パック",
    ArmBand: "アームバンド",
    Armor: "アーマー",
    ArmoredEquipment: "アーマー & 装備",
    AssaultCarbine: "アサルトカービン",
    AssaultRifle: "アサルトライフル",
    AssaultScope: "アサルトスコープ",
    AuxiliaryMod: "補助パーツ",
    Backpack: "バックパック",
    Barrel: "バレル",
    BarterItem: "取引アイテム",
    Battery: "バッテリー",
    Bipod: "バイポッド",
    BuildingMaterial: "建築材料",
    ChargingHandle: "チャージングハンドル",
    ChestRig: "リグ & アーマーリグ",
    CombMuzzleDevice: "コンボマズルデバイス",
    CombTactDevice: "コンボタクティカルデバイス",
    CommonContainer: "コンテナ",
    CompactReflexSight: "コンパクトリフレックスサイト",
    Compass: "コンパス",
    CompoundItem: "CompoundItem",
    CylinderMagazine: "シリンダーマガジン",
    Drink: "飲み物",
    Drug: "薬品",
    Electronics: "電子機器",
    Equipment: "装備品",
    EssentialMod: "機関部パーツ",
    FaceCover: "フェイスカバー",
    Flashhider: "フラッシュハイダー",
    Flashlight: "フラッシュライト",
    Food: "食べ物",
    FoodAndDrink: "飲食物",
    Foregrip: "フォアグリップ",
    Fuel: "燃料",
    FunctionalMod: "アタッチメント",
    GasBlock: "ガスブロック",
    GearMod: "外装系パーツ",
    GrenadeLauncher: "グレネードランチャー",
    Handguard: "ハンドガード",
    Handgun: "ハンドガン",
    Headphones: "ヘッドフォン",
    Headwear: "ヘッドウェア",
    HouseholdGoods: "生活用品",
    Info: "情報書類",
    Ironsight: "アイアンサイト",
    Item: "アイテム",
    Jewelry: "宝飾品",
    Key: "鍵",
    MechanicalKey: "物理キー",
    Keycard: "キーカード",
    Knife: "ナイフ",
    LockingContainer: "施錠可能なコンテナ",
    Lubricant: "可燃物",
    Machinegun: "マシンガン",
    Magazine: "マガジン",
    Map: "地図",
    MarksmanRifle: "マークスマンライフル",
    MedicalItem: "医療アイテム",
    MedicalSupplies: "医療用品",
    Medikit: "メディキット",
    Meds: "医療品",
    Money: "お金",
    Mount: "マウント",
    MuzzleDevice: "マズルデバイス",
    NightVision: "ナイトビジョン",
    Other: "その他",
    PistolGrip: "ピストルグリップ",
    PortContainer: "携帯コンテナ",
    PortableRangeFinder: "携帯レンジファインダー",
    RadioTransmitter: "ラジオトランスミッター",
    RandomLootContainer: "RandomLootContainer",
    Receiver: "レシーバー",
    ReflexSight: "リフレックスサイト",
    RepairKits: "リペアキット",
    Revolver: "リボルバー",
    Smg: "サブマシンガン",
    Scope: "スコープ",
    SearchableItem: "探索可能アイテム",
    Shotgun: "ショットガン",
    Sights: "サイト&スコープ",
    Silencer: "サイレンサー",
    SniperRifle: "スナイパーライフル",
    SpecialItem: "特殊アイテム",
    SpecialScope: "特殊スコープ",
    SpringDrivenCylinder: "スプリングドリブンシリンダー",
    StackableItem: "スタック可能アイテム",
    Stimulant: "注射器",
    Stock: "ストック",
    ThermalVision: "サーマルビジョン",
    ThrowableWeapon: "投擲武器",
    Tool: "ツール",
    Ubgl: "アンダーバレルグレネードランチャー",
    VisObservDevice: "サングラス類",
    Weapon: "武器",
    WeaponMod: "武器パーツ",
  },

  ARMOR_MATERIAL: [
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
  ],

  HEAD_ZONES: {
    "Top of the head": "前頭部",
    "Eyes": "目",
    "Ears": "耳",
    "Jaws": "顎",
    "Lower nape": "うなじ",
    "Nape": "後頭部",
  },

  BODY_ZONES: {
    THORAX: "Thorax",
    STOMACH: "Stomach",
    LEFT_ARM: "Left arm",
    RIGHT_ARM: "Right arm",
  },

  ITEM_PROPERTIES: {
    name: "アイテム名",
    basePrice: "基準価格",
    sellPrice: "売値",
    usedInTasks: "タスクでの使用",
    width: "幅",
    height: "高さ",
    avg24hPrice: "平均価格(24h)",
  },

  ITEM_PROPERTIES_TAB: {
    detail: "詳細",
    unlock_requirement: "解除条件",
    chart: "価格チャート",
  },

  ITEM_PROPERTIES_AMMO: {
    title: "詳細",
    damage: "ダメージ",
    armorDamage: "アーマーダメージ",
    caliber: "口径",
    tracer: "トレーサー",
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
  },

  ITEM_PROPERTIES_ARMOR: {
    title: "詳細",
    zones: "保護部位",
    class: "アーマークラス",
    durability: "耐久",
    ergoPenalty: "エルゴペナルティ",
    material: "素材",
    repairCost: "修理コスト",
    speedPenalty: "移動速度ペナルティ",
    turnPenalty: "振向きペナルティ",
  },

  ITEM_PROPERTIES_ARMOR_ATTACHMENT: {
    title: "詳細",
    blindnessProtection: "フラッシュ耐性",
    class: "アーマークラス",
    durability: "耐久",
    ergoPenalty: "エルゴペナルティ",
    headZones: "保護部位",
    material: "素材",
    repairCost: "修理コスト",
    speedPenalty: "移動速度ペナルティ",
    turnPenalty: "振向きペナルティ",
  },

  ITEM_PROPERTIES_BACKPACK: {
    title: "詳細",
    capacity: "容量",
    grid: "構造",
    ergoPenalty: "エルゴペナルティ",
    speedPenalty: "移動速度ペナルティ",
    turnPenalty: "振向きペナルティ",
  },

  ITEM_PROPERTIES_BARREL: {
    title: "詳細",
    centerOfImpact: "集弾姓",
    deviationCurve: "deviationCurve",
    deviationMax: "deviationMax",
    ergonomics: "エルゴノミクス",
    recoilModifier: "リコイル",
  },

  ITEM_PROPERTIES_CHEST_RIG: {
    title: "詳細",
    capacity: "容量",
    class: "アーマークラス",
    durability: "耐久",
    ergoPenalty: "エルゴペナルティ",
    material: "素材",
    repairCost: "修理コスト",
    speedPenalty: "移動速度ペナルティ",
    turnPenalty: "振向きペナルティ",
  },

  ITEM_PROPERTIES_CONTAINER: {
    title: "詳細",
    capacity: "容量",
    grid: "構造",
  },

  ITEM_PROPERTIES_FOOD_DRINK: {
    title: "詳細",
    stimEffects: "効果",
    energy: "エネルギー",
    hydration: "水分",
    units: "units",
    chance: "確率",
    delay: "遅延",
    duration: "持続時間",
    percent: "確率",
    skillName: "効果名",
    value: "値"
  },

  ITEM_PROPERTIES_GLASSES: {
    title: "詳細",
    blindnessProtection: "フラッシュ耐性",
    class: "アーマークラス",
    durability: "耐久",
    material: "素材",
    repairCost: "修理コスト",
  },

  ITEM_PROPERTIES_GRENADE: {
    title: "詳細",
    contusionRadius: "ダメージ半径",
    fragments: "破片",
    fuse: "遅延",
    maxExplosionDistance: "最大爆発距離",
    minExplosionDistance: "最小爆発距離",
    type: "type",
  },

  ITEM_PROPERTIES_HELMET: {
    title: "詳細",
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
  },

  ITEM_PROPERTIES_KEY: {
    title: "詳細",
    uses: "使用可能回数",
  },

  ITEM_PROPERTIES_MAGAZINE: {
    title: "詳細",
    allowedAmmo: "使用可能弾薬",
    ammoCheckModifier: "チェック速度",
    capacity: "容量",
    ergonomics: "エルゴノミクス",
    loadModifier: "ロード速度",
    malfunctionChance: "誤作動率",
    recoilModifier: "リコイル",
    slots: "slots",
  },

  ITEM_PROPERTIES_MEDKIT: {
    title: "詳細",
    cures: "治療種類",
    hitpoints: "HP",
    hpCostHeavyBleeding: "止血コスト(重度)",
    hpCostLightBleeding: "止血コスト(軽度)",
    maxHealPerUse: "最大回復/1使用",
    useTime: "使用時間",
  },

  ITEM_PROPERTIES_MEDICAL_ITEM: {
    title: "詳細",
    cures: "治療種類",
    useTime: "使用時間",
    uses: "使用可能回数",
  },

  ITEM_PROPERTIES_MELEE: {
    title: "詳細",
    hitRadius: "攻撃可能半径",
    slashDamage: "斬撃ダメージ",
    stabDamage: "刺突ダメージ",
  },

  ITEM_PROPERTIES_NIGHT_VISION: {
    title: "詳細",
    diffuseIntensity: "diffuseIntensity",
    intensity: "intensity",
    noiseIntensity: "noiseIntensity",
    noiseScale: "noiseScale",
  },

  ITEM_PROPERTIES_PAINKILLER: {
    title: "詳細",
    cures: "治療種類",
    energyImpact: "エネルギー消費",
    hydrationImpact: "水分消費",
    painkillerDuration: "持続時間",
    useTime: "使用時間",
    uses: "使用可能回数",
  },

  ITEM_PROPERTIES_PRESET: {
    title: "詳細",
    baseItem: "ベースアイテム",
    ergonomics: "エルゴノミクス",
    moa: "MOA",
    recoilHorizontal: "水平反動",
    recoilVertical: "垂直反動",
  },

  ITEM_PROPERTIES_SCOPE: {
    title: "詳細",
    ergonomics: "エルゴノミクス",
    recoilModifier: "リコイル",
    sightModes: "照準モード",
    sightingRange: "照準範囲",
    slots: "slots",
    zoomLevels: "ズームレベル",
  },

  ITEM_PROPERTIES_STIM: {
    title: "詳細",
    cures: "治療種類",
    stimEffects: "使用効果",
    useTime: "使用時間",
  },

  ITEM_PROPERTIES_SURGICAL_KIT: {
    title: "詳細",
    cures: "治療種類",
    maxLimbHealth: "部位最大HP",
    minLimbHealth: "部位最小HP",
    useTime: "使用時間",
    uses: "使用可能回数",
  },

  ITEM_PROPERTIES_WEAPON: {
    title: "詳細",
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
  },

  ITEM_PROPERTIES_WEAPON_MOD: {
    title: "詳細",
    accuracyModifier: "精度",
    ergonomics: "エルゴノミクス",
    recoilModifier: "リコイル",
  },
};

export type typeJaDict = typeof JA_DICT;

export default JA_DICT