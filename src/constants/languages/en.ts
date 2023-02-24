const EN_DICT = {
  HOME_SENTENCE: {
    welcome_msg: "Welcome to",
    discord_server: "Join our Discord server",
    search_item: "Want to search items?",
    search_task: "Want to search tasks?",
    server_status: {
      "title": "Server status",
      "Website": "Web",
      "Forum": "Forum",
      "Authentication": "Authentication",
      "Launcher": "Launcher",
      "Group lobby": "Group lobby",
      "Trading": "Trading",
      "Matchmaking": "Match making",
      "Friends and msg.": "Friend and message",
      "Inventory operations": "Inventory",
      "Global": "Global",
    },
  },

  ITEM_DETAIL_DIALOG:{
    SIZE: "Size",
    NO_DETAIL: "No detail info.",
    WIDTH:"width",
    HEIGHT:"he"
  },

  MENU_SENTENCE:{
    task:"Tasks",
    item:"Items",
  },
  ARMOR_MATERIAL: [
    {
      name: "Ultra High Molecular Weight Polyethylene",
      id: "UHMWPE",
    },
    {
      name: "Aramid",
      id: "Aramid",
    },
    {
      name: "Composite",
      id: "Combined",
    },
    {
      name: "Titanium",
      id: "Titan",
    },
    {
      name: "Aluminum",
      id: "Aluminium",
    },
    {
      name: "Steel",
      id: "ArmoredSteel",
    },
    {
      name: "Ceramic",
      id: "Ceramic",
    },
    {
      name: "Glass",
      id: "Glass",
    },
  ],

  ITEM_PROPERTIES: {
    name: "Name",
    basePrice: "Base price",
    usedInTasks: "Used in tasks",
    width: "Width",
    height: "Height",
    avg24hPrice: "Average price (24h)",
  },

  ITEM_PROPERTIES_AMMO: {
    damage: "Damage",
    armorDamage: "Armor damage",
    fragmentationChance: "Fragmentation chance",
    ricochetChance: "Ricochet chance",
    penetrationChance: "Penetration chance",
    penetrationPower: "Penetration power",
    accuracyModifier: "Accuracy",
    recoilModifier: "Recoil",
    initialSpeed: "Initial speed",
    lightBleedModifier: "Light bleeding chance",
    heavyBleedModifier: "Heavy bleeding chance",
    durabilityBurnFactor: "Durability burn rate",
    heatFactor: "HEAT",
  },

  ITEM_PROPERTIES_ARMOR: {
    class: "Armor class",
    durability: "Durability",
    ergoPenalty: "Ergonomics penalty",
    material: "Material",
    repairCost: "Repair cost",
    speedPenalty: "Movement speed penalty",
    turnPenalty: "Turning speed penalty",
  },

  ITEM_PROPERTIES_ARMOR_ATTACHMENT: {
    blindnessProtection: "Flash protection",
    class: "Armor class",
    durability: "Durability",
    ergoPenalty: "Ergonomics penalty",
    headZones: "Protected zones",
    material: "Material",
    repairCost: "Repair cost",
    speedPenalty: "Movement speed penalty",
    turnPenalty: "Turning speed penalty",
  },

  ITEM_PROPERTIES_BACKPACK: {
    capacity: "Capacity",
    grid: "Grid",
  },

  ITEM_PROPERTIES_BARREL: {
    centerOfImpact: "Center of impact",
    deviationCurve: "Deviation curve",
    deviationMax: "Max deviation",
    ergonomics: "Ergonomics",
    recoilModifier: "Recoil",
  },

  ITEM_PROPERTIES_CHEST_RIG: {
    capacity: "Capacity",
    class: "Armor class",
    durability: "Durability",
    ergoPenalty: "Ergonomics penalty",
    material: "Material",
    repairCost: "Repair cost",
    speedPenalty: "Movement speed penalty",
    turnPenalty: "Turning speed penalty",
  },

  ITEM_PROPERTIES_CONTAINER: {
    capacity: "Capacity",
    grid: "Grid",
  },

  ITEM_PROPERTIES_FOOD_DRINK: {
    energy: "Energy",
    hydration: "Hydration",
    units: "Units",
  },

  ITEM_PROPERTIES_GLASSES: {
    blindnessProtection: "Flash protection",
    class: "Armor class",
    durability: "Durability",
    material: "Material",
    repairCost: "Repair cost",
  },

  ITEM_PROPERTIES_GRENADE: {
    contusionRadius: "Damage radius",
    fragments: "Fragments",
    fuse: "Fuse",
    maxExplosionDistance: "Max explosion distance",
    minExplosionDistance: "Min explosion distance",
    type: "Type",
  },

  ITEM_PROPERTIES_HELMET: {
    blindnessProtection: "Flash protection",
    blocksHeadset: "Blocks headset",
    class: "Armor class",
    deafening: "Deafening",
    durability: "Durability",
    ergoPenalty: "Ergonomics penalty",
    headZones: "Protection zones",
    material: "Material",
    repairCost: "Repair cost",
    ricochetX: "Ricochet X",
    ricochetY: "Ricochet Y",
    ricochetZ: "Ricochet Z",
    slots: "Slots",
    speedPenalty: "Movement speed penalty",
    turnPenalty: "Turning speed penalty",
  },

  ITEM_PROPERTIES_KEY: {
    uses: "Uses",
  },

  ITEM_PROPERTIES_MAGAZINE: {
    allowedAmmo: "Allowed ammo",
    ammoCheckModifier: "Check speed",
    capacity: "Capacity",
    ergonomics: "Ergonomics",
    loadModifier: "Load speed",
    malfunctionChance: "Malfunction chance",
    recoilModifier: "Recoil",
    slots: "Slots",
  },

  ITEM_PROPERTIES_MEDKIT: {
    cures: "Cures",
    hitpoints: "HP",
    hpCostHeavyBleeding: "Heavy bleeding cost",
    hpCostLightBleeding: "Light bleeding cost",
    maxHealPerUse: "Max heal per use",
    useTime: "Use time",
  },

  ITEM_PROPERTIES_MEDICAL_ITEM: {
    cures: "Cures",
    useTime: "Use time",
    uses: "Uses",
  },

  ITEM_PROPERTIES_MELEE: {
    hitRadius: "Attack radius",
    slashDamage: "Slash damage",
    stabDamage: "Stab damage",
  },

  ITEM_PROPERTIES_NIGHT_VISION: {
    diffuseIntensity: "Diffuse intensity",
    intensity: "Intensity",
    noiseIntensity: "Noise intensity",
    noiseScale: "Noise scale",
  },

  ITEM_PROPERTIES_PAINKILLER: {
    cures: "Cures",
    energyImpact: "Energy impact",
    hydrationImpact: "Hydration impact",
    painkillerDuration: "Duration",
    useTime: "Use time",
    uses: "Uses",
  },

  ITEM_PROPERTIES_PRESET: {
    baseItem: "Base item",
    ergonomics: "Ergonomics",
    moa: "MOA",
    recoilHorizontal: "Horizontal recoil",
    recoilVertical: "Vertical recoil",
  },

  ITEM_PROPERTIES_SCOPE: {
    ergonomics: "Ergonomics",
    recoilModifier: "Recoil",
    sightModes: "Sight modes",
    sightingRange: "Sighting range",
    slots: "Slots",
    zoomLevels: "Zoom levels",
  },

  ITEM_PROPERTIES_STIM: {
    cures: "Cures",
    stimEffects: "Stim effects",
    useTime: "Use time",
  },

  ITEM_PROPERTIES_SURGICAL_KIT: {
    cures: "Cures",
    maxLimbHealth: "Max limb health",
    minLimbHealth: "Min limb health",
    useTime: "Use time",
    uses: "Uses",
  },

  ITEM_PROPERTIES_WEAPON: {
    allowedAmmo: "Allowed Ammo",
    caliber: "Caliber",
    centerOfImpact: "Center of Impact",
    defaultAmmo: "Default Ammo",
    defaultErgonomics: "Default Ergonomics",
    defaultHeight: "Default Height",
    defaultPreset: "Default Preset",
    defaultRecoilHorizontal: "Default Horizontal Recoil",
    defaultRecoilVertical: "Default Vertical Recoil",
    defaultWeight: "Default Weight",
    defaultWidth: "Default Width",
    deviationCurve: "Deviation Curve",
    deviationMax: "Deviation Max",
    effectiveDistance: "Effective Distance",
    ergonomics: "Ergonomics",
    fireModes: "Fire Modes",
    fireRate: "Fire Rate",
    maxDurability: "Max Durability",
    presets: "Presets",
    recoilHorizontal: "Horizontal Recoil",
    recoilVertical: "Vertical Recoil",
    repairCost: "Repair Cost",
    sightingRange: "Sighting Range",
    slots: "Slots",
  },

  ITEM_PROPERTIES_WEAPON_MOD: {
    accuracyModifier: "Accuracy Modifier",
    ergonomics: "Ergonomics",
    recoilModifier: "Recoil Modifier",
  },
  ITEM_TYPE : {
    Ammo : 'Ammo',
    AmmoBox : 'AmmoBox',
    Any : 'Any',
    Armor : 'Armor',
    Backpack : 'Backpack',
    Barter : 'Barter',
    Container : 'Container',
    Glasses : 'Glasses',
    Grenade : 'Grenade',
    Gun : 'Gun',
    Headphones : 'Headphones',
    Helmet : 'Helmet',
    Injectors : 'Injectors',
    Keys : 'Keys',
    MarkedOnly : 'MarkedOnly',
    Meds : 'Meds',
    Mods : 'Mods',
    NoFlea : 'NoFlea',
    PistolGrip : 'PistolGrip',
    Preset : 'Preset',
    Provisions : 'Provisions',
    Rig : 'Rig',
    Suppressor : 'Suppressor',
    Wearable : 'Wearable'
  },
  
  ITEM_CATEGORY_NAME: {
    Ammo: 'Ammunition',
    AmmoContainer: 'Ammunition Container',
    ArmBand: 'Arm Band',
    Armor: 'Armor',
    ArmoredEquipment: 'Armored Equipment',
    AssaultCarbine: 'Assault Carbine',
    AssaultRifle: 'Assault Rifle',
    AssaultScope: 'Assault Scope',
    AuxiliaryMod: 'Auxiliary Mod',
    Backpack: 'Backpack',
    Barrel: 'Barrel',
    BarterItem: 'Barter Item',
    Battery: 'Battery',
    Bipod: 'Bipod',
    BuildingMaterial: 'Building Material',
    ChargingHandle: 'Charging Handle',
    ChestRig: 'Chest Rig',
    CombMuzzleDevice: 'Combination Muzzle Device',
    CombTactDevice: 'Combination Tactical Device',
    CommonContainer: 'Common Container',
    CompactReflexSight: 'Compact Reflex Sight',
    Compass: 'Compass',
    CompoundItem: 'Compound Item',
    CylinderMagazine: 'Cylinder Magazine',
    Drink: 'Drink',
    Drug: 'Drug',
    Electronics: 'Electronics',
    Equipment: 'Equipment',
    EssentialMod: 'Essential Mod',
    FaceCover: 'Face Cover',
    Flashhider: 'Flash Hider',
    Flashlight: 'Flashlight',
    Food: 'Food',
    FoodAndDrink: 'Food and Drink',
    Foregrip: 'Foregrip',
    Fuel: 'Fuel',
    FunctionalMod: 'Functional Mod',
    GasBlock: 'Gas Block',
    GearMod: 'Gear Mod',
    GrenadeLauncher: 'Grenade Launcher',
    Handguard: 'Handguard',
    Handgun: 'Handgun',
    Headphones: 'Headphones',
    Headwear: 'Headwear',
    HouseholdGoods: 'Household Goods',
    Info: 'Information',
    Ironsight: 'Iron Sight',
    Item: 'Item',
    Jewelry: 'Jewelry',
    Key: 'Key',
    MechanicalKey: 'Mechanical Key',
    Keycard: 'Keycard',
    Knife: 'Knife',
    LockingContainer: 'Lockable Container',
    Lubricant: 'Lubricant',
    Machinegun: 'Machine Gun',
    Magazine: 'Magazine',
    Map: 'Map',
    MarksmanRifle: 'Marksman Rifle',
    MedicalItem: 'Medical Item',
    MedicalSupplies: 'Medical Supplies',
    Medikit: 'Medikit',
    Meds: 'Medications',
    Money: 'Money',
    Mount: 'Mount',
    MuzzleDevice: 'Muzzle Device',
    NightVision: 'Night Vision',
    Other: 'Other',
    PistolGrip: 'Pistol Grip',
    PortContainer: 'Portable Container',
    PortableRangeFinder: 'Portable Range Finder',
    RadioTransmitter: 'Radio Transmitter',
    RandomLootContainer: 'Random Loot Container',
    Receiver: 'Receiver',
    ReflexSight: 'Reflex Sight',
    RepairKits: 'Repair Kit',
    Revolver: 'Revolver',
    Smg: 'Submachine Gun',
    Scope: 'Scope',
    SearchableItem: 'Searchable Item',
    Shotgun: 'Shotgun',
    Sights: 'Sights',
    Silencer: 'Silencer',
    SniperRifle: 'Sniper Rifle',
    SpecialItem: 'Special Item',
    SpecialScope: 'Special Scope',
    SpringDrivenCylinder: 'Spring-Driven Cylinder',
    StackableItem: 'Stackable Item',
    Stimulant: 'Syringe',
    Stock: 'Stock',
    ThermalVision: 'Thermal Vision',
    ThrowableWeapon: 'Throwable Weapon',
    Tool: 'Tool',
    Ubgl: 'Underbarrel Grenade Launcher',
    VisObservDevice: 'Eyewear',
    Weapon: 'Weapon',
    WeaponMod: 'Weapon Part'
  }
}

export type typeEnDict = typeof EN_DICT;

export default EN_DICT;