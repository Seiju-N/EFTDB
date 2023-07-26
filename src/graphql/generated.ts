export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ammo = {
  readonly __typename?: 'Ammo';
  /** @deprecated Use accuracyModifier instead. */
  readonly accuracy?: Maybe<Scalars['Int']>;
  readonly accuracyModifier?: Maybe<Scalars['Float']>;
  readonly ammoType: Scalars['String'];
  readonly armorDamage: Scalars['Int'];
  readonly caliber?: Maybe<Scalars['String']>;
  readonly damage: Scalars['Int'];
  readonly fragmentationChance: Scalars['Float'];
  readonly heavyBleedModifier: Scalars['Float'];
  readonly initialSpeed?: Maybe<Scalars['Float']>;
  readonly item: Item;
  readonly lightBleedModifier: Scalars['Float'];
  readonly penetrationChance: Scalars['Float'];
  readonly penetrationPower: Scalars['Int'];
  readonly projectileCount?: Maybe<Scalars['Int']>;
  /** @deprecated Use recoilModifier instead. */
  readonly recoil?: Maybe<Scalars['Int']>;
  readonly recoilModifier?: Maybe<Scalars['Float']>;
  readonly ricochetChance: Scalars['Float'];
  readonly stackMaxSize: Scalars['Int'];
  readonly staminaBurnPerDamage?: Maybe<Scalars['Float']>;
  readonly tracer: Scalars['Boolean'];
  readonly tracerColor?: Maybe<Scalars['String']>;
  readonly weight: Scalars['Float'];
};

export type ArmorMaterial = {
  readonly __typename?: 'ArmorMaterial';
  readonly destructibility?: Maybe<Scalars['Float']>;
  readonly explosionDestructibility?: Maybe<Scalars['Float']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly maxRepairDegradation?: Maybe<Scalars['Float']>;
  readonly maxRepairKitDegradation?: Maybe<Scalars['Float']>;
  readonly minRepairDegradation?: Maybe<Scalars['Float']>;
  readonly minRepairKitDegradation?: Maybe<Scalars['Float']>;
  readonly name?: Maybe<Scalars['String']>;
};

export type AttributeThreshold = {
  readonly __typename?: 'AttributeThreshold';
  readonly name: Scalars['String'];
  readonly requirement: NumberCompare;
};

export type Barter = {
  readonly __typename?: 'Barter';
  readonly id: Scalars['ID'];
  readonly level: Scalars['Int'];
  readonly requiredItems: ReadonlyArray<Maybe<ContainedItem>>;
  /** @deprecated Use level instead. */
  readonly requirements: ReadonlyArray<Maybe<PriceRequirement>>;
  readonly rewardItems: ReadonlyArray<Maybe<ContainedItem>>;
  /** @deprecated Use trader and level instead. */
  readonly source: Scalars['String'];
  /** @deprecated Use trader instead. */
  readonly sourceName: ItemSourceName;
  readonly taskUnlock?: Maybe<Task>;
  readonly trader: Trader;
};

export type BossEscort = {
  readonly __typename?: 'BossEscort';
  readonly amount?: Maybe<ReadonlyArray<Maybe<BossEscortAmount>>>;
  readonly boss: MobInfo;
  /** @deprecated Use boss.name instead. */
  readonly name: Scalars['String'];
  /** @deprecated Use boss.normalizedName instead. */
  readonly normalizedName: Scalars['String'];
};

export type BossEscortAmount = {
  readonly __typename?: 'BossEscortAmount';
  readonly chance: Scalars['Float'];
  readonly count: Scalars['Int'];
};

export type BossSpawn = {
  readonly __typename?: 'BossSpawn';
  readonly boss: MobInfo;
  readonly escorts: ReadonlyArray<Maybe<BossEscort>>;
  /** @deprecated Use boss.name instead. */
  readonly name: Scalars['String'];
  /** @deprecated Use boss.normalizedName instead. */
  readonly normalizedName: Scalars['String'];
  readonly spawnChance: Scalars['Float'];
  readonly spawnLocations: ReadonlyArray<Maybe<BossSpawnLocation>>;
  readonly spawnTime?: Maybe<Scalars['Int']>;
  readonly spawnTimeRandom?: Maybe<Scalars['Boolean']>;
  readonly spawnTrigger?: Maybe<Scalars['String']>;
};

/**
 * The chances of spawning in a given location are
 * very rough estimates and may be incaccurate
 */
export type BossSpawnLocation = {
  readonly __typename?: 'BossSpawnLocation';
  readonly chance: Scalars['Float'];
  readonly name: Scalars['String'];
  readonly spawnKey: Scalars['String'];
};

export type ContainedItem = {
  readonly __typename?: 'ContainedItem';
  readonly attributes?: Maybe<ReadonlyArray<Maybe<ItemAttribute>>>;
  readonly count: Scalars['Float'];
  readonly item: Item;
  readonly quantity: Scalars['Float'];
};

export type Craft = {
  readonly __typename?: 'Craft';
  readonly duration: Scalars['Int'];
  readonly id: Scalars['ID'];
  readonly level: Scalars['Int'];
  readonly requiredItems: ReadonlyArray<Maybe<ContainedItem>>;
  readonly requiredQuestItems: ReadonlyArray<Maybe<QuestItem>>;
  /** @deprecated Use stationLevel instead. */
  readonly requirements: ReadonlyArray<Maybe<PriceRequirement>>;
  readonly rewardItems: ReadonlyArray<Maybe<ContainedItem>>;
  /** @deprecated Use stationLevel instead. */
  readonly source: Scalars['String'];
  /** @deprecated Use stationLevel instead. */
  readonly sourceName: Scalars['String'];
  readonly station: HideoutStation;
  readonly taskUnlock?: Maybe<Task>;
};

export type FleaMarket = Vendor & {
  readonly __typename?: 'FleaMarket';
  readonly enabled: Scalars['Boolean'];
  readonly minPlayerLevel: Scalars['Int'];
  readonly name: Scalars['String'];
  readonly normalizedName: Scalars['String'];
  readonly reputationLevels: ReadonlyArray<Maybe<FleaMarketReputationLevel>>;
  readonly sellOfferFeeRate: Scalars['Float'];
  readonly sellRequirementFeeRate: Scalars['Float'];
};

export type FleaMarketReputationLevel = {
  readonly __typename?: 'FleaMarketReputationLevel';
  readonly maxRep: Scalars['Float'];
  readonly minRep: Scalars['Float'];
  readonly offers: Scalars['Int'];
};

export type GameProperty = {
  readonly __typename?: 'GameProperty';
  readonly arrayValue?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly key: Scalars['String'];
  readonly numericValue?: Maybe<Scalars['Float']>;
  readonly objectValue?: Maybe<Scalars['String']>;
  readonly stringValue?: Maybe<Scalars['String']>;
};

export const enum HandbookCategoryName {
  Ammo = 'Ammo',
  AmmoPacks = 'AmmoPacks',
  AssaultCarbines = 'AssaultCarbines',
  AssaultRifles = 'AssaultRifles',
  AssaultScopes = 'AssaultScopes',
  AuxiliaryParts = 'AuxiliaryParts',
  Backpacks = 'Backpacks',
  Barrels = 'Barrels',
  BarterItems = 'BarterItems',
  Bipods = 'Bipods',
  BodyArmor = 'BodyArmor',
  BoltActionRifles = 'BoltActionRifles',
  BuildingMaterials = 'BuildingMaterials',
  ChargingHandles = 'ChargingHandles',
  Collimators = 'Collimators',
  CompactCollimators = 'CompactCollimators',
  Drinks = 'Drinks',
  ElectronicKeys = 'ElectronicKeys',
  Electronics = 'Electronics',
  EnergyElements = 'EnergyElements',
  Eyewear = 'Eyewear',
  Facecovers = 'Facecovers',
  FlammableMaterials = 'FlammableMaterials',
  FlashhidersBrakes = 'FlashhidersBrakes',
  Flashlights = 'Flashlights',
  Food = 'Food',
  Foregrips = 'Foregrips',
  FunctionalMods = 'FunctionalMods',
  GasBlocks = 'GasBlocks',
  Gear = 'Gear',
  GearComponents = 'GearComponents',
  GearMods = 'GearMods',
  GrenadeLaunchers = 'GrenadeLaunchers',
  Handguards = 'Handguards',
  Headgear = 'Headgear',
  Headsets = 'Headsets',
  HouseholdMaterials = 'HouseholdMaterials',
  InfoItems = 'InfoItems',
  Injectors = 'Injectors',
  InjuryTreatment = 'InjuryTreatment',
  IronSights = 'IronSights',
  Keys = 'Keys',
  LaserTargetPointers = 'LaserTargetPointers',
  Launchers = 'Launchers',
  LightLaserDevices = 'LightLaserDevices',
  MachineGuns = 'MachineGuns',
  Magazines = 'Magazines',
  Maps = 'Maps',
  MarksmanRifles = 'MarksmanRifles',
  MechanicalKeys = 'MechanicalKeys',
  MedicalSupplies = 'MedicalSupplies',
  Medication = 'Medication',
  Medkits = 'Medkits',
  MeleeWeapons = 'MeleeWeapons',
  Money = 'Money',
  Mounts = 'Mounts',
  MuzzleAdapters = 'MuzzleAdapters',
  MuzzleDevices = 'MuzzleDevices',
  Optics = 'Optics',
  Others = 'Others',
  Pills = 'Pills',
  PistolGrips = 'PistolGrips',
  Pistols = 'Pistols',
  Provisions = 'Provisions',
  ReceiversSlides = 'ReceiversSlides',
  Rounds = 'Rounds',
  SmGs = 'SMGs',
  SecureContainers = 'SecureContainers',
  Shotguns = 'Shotguns',
  Sights = 'Sights',
  SpecialEquipment = 'SpecialEquipment',
  SpecialPurposeSights = 'SpecialPurposeSights',
  SpecialWeapons = 'SpecialWeapons',
  StocksChassis = 'StocksChassis',
  StorageContainers = 'StorageContainers',
  Suppressors = 'Suppressors',
  TacticalComboDevices = 'TacticalComboDevices',
  TacticalRigs = 'TacticalRigs',
  Throwables = 'Throwables',
  Tools = 'Tools',
  Valuables = 'Valuables',
  VitalParts = 'VitalParts',
  WeaponPartsMods = 'WeaponPartsMods',
  Weapons = 'Weapons'
};

export type HealthEffect = {
  readonly __typename?: 'HealthEffect';
  readonly bodyParts: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly effects: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly time?: Maybe<NumberCompare>;
};

export type HealthPart = {
  readonly __typename?: 'HealthPart';
  readonly bodyPart: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly max: Scalars['Int'];
};

/** HideoutModule has been replaced with HideoutStation. */
export type HideoutModule = {
  readonly __typename?: 'HideoutModule';
  /** @deprecated Use HideoutStation type instead. */
  readonly id?: Maybe<Scalars['Int']>;
  readonly itemRequirements: ReadonlyArray<Maybe<ContainedItem>>;
  readonly level?: Maybe<Scalars['Int']>;
  readonly moduleRequirements: ReadonlyArray<Maybe<HideoutModule>>;
  /** @deprecated Use HideoutStation type instead. */
  readonly name?: Maybe<Scalars['String']>;
};

export type HideoutStation = {
  readonly __typename?: 'HideoutStation';
  /** crafts is only available via the hideoutStations query. */
  readonly crafts: ReadonlyArray<Maybe<Craft>>;
  readonly id: Scalars['ID'];
  readonly levels: ReadonlyArray<Maybe<HideoutStationLevel>>;
  readonly name: Scalars['String'];
  readonly normalizedName: Scalars['String'];
  readonly tarkovDataId?: Maybe<Scalars['Int']>;
};

export type HideoutStationBonus = {
  readonly __typename?: 'HideoutStationBonus';
  readonly name: Scalars['String'];
  readonly passive?: Maybe<Scalars['Boolean']>;
  readonly production?: Maybe<Scalars['Boolean']>;
  readonly skillName?: Maybe<Scalars['String']>;
  readonly slotItems?: Maybe<ReadonlyArray<Maybe<Item>>>;
  readonly type: Scalars['String'];
  readonly value?: Maybe<Scalars['Float']>;
};

export type HideoutStationLevel = {
  readonly __typename?: 'HideoutStationLevel';
  readonly bonuses?: Maybe<ReadonlyArray<Maybe<HideoutStationBonus>>>;
  readonly constructionTime: Scalars['Int'];
  /** crafts is only available via the hideoutStations query. */
  readonly crafts: ReadonlyArray<Maybe<Craft>>;
  readonly description: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly itemRequirements: ReadonlyArray<Maybe<RequirementItem>>;
  readonly level: Scalars['Int'];
  readonly skillRequirements: ReadonlyArray<Maybe<RequirementSkill>>;
  readonly stationLevelRequirements: ReadonlyArray<Maybe<RequirementHideoutStationLevel>>;
  readonly tarkovDataId?: Maybe<Scalars['Int']>;
  readonly traderRequirements: ReadonlyArray<Maybe<RequirementTrader>>;
};

export type Item = {
  readonly __typename?: 'Item';
  readonly accuracyModifier?: Maybe<Scalars['Float']>;
  readonly avg24hPrice?: Maybe<Scalars['Int']>;
  readonly backgroundColor: Scalars['String'];
  readonly bartersFor: ReadonlyArray<Maybe<Barter>>;
  readonly bartersUsing: ReadonlyArray<Maybe<Barter>>;
  readonly baseImageLink?: Maybe<Scalars['String']>;
  readonly basePrice: Scalars['Int'];
  readonly blocksHeadphones?: Maybe<Scalars['Boolean']>;
  /** @deprecated Use category instead. */
  readonly bsgCategory?: Maybe<ItemCategory>;
  readonly bsgCategoryId?: Maybe<Scalars['String']>;
  readonly buyFor?: Maybe<ReadonlyArray<ItemPrice>>;
  readonly categories: ReadonlyArray<Maybe<ItemCategory>>;
  readonly category?: Maybe<ItemCategory>;
  /** @deprecated No longer meaningful with inclusion of Item category. */
  readonly categoryTop?: Maybe<ItemCategory>;
  readonly changeLast48h?: Maybe<Scalars['Float']>;
  readonly changeLast48hPercent?: Maybe<Scalars['Float']>;
  readonly conflictingItems?: Maybe<ReadonlyArray<Maybe<Item>>>;
  readonly conflictingSlotIds?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly containsItems?: Maybe<ReadonlyArray<Maybe<ContainedItem>>>;
  readonly craftsFor: ReadonlyArray<Maybe<Craft>>;
  readonly craftsUsing: ReadonlyArray<Maybe<Craft>>;
  readonly description?: Maybe<Scalars['String']>;
  readonly ergonomicsModifier?: Maybe<Scalars['Float']>;
  readonly fleaMarketFee?: Maybe<Scalars['Int']>;
  readonly gridImageLink?: Maybe<Scalars['String']>;
  /** @deprecated Fallback handled automatically by gridImageLink. */
  readonly gridImageLinkFallback: Scalars['String'];
  readonly handbookCategories: ReadonlyArray<Maybe<ItemCategory>>;
  readonly hasGrid?: Maybe<Scalars['Boolean']>;
  readonly height: Scalars['Int'];
  readonly high24hPrice?: Maybe<Scalars['Int']>;
  /** historicalPrices is only available via the item and items queries. */
  readonly historicalPrices?: Maybe<ReadonlyArray<Maybe<HistoricalPricePoint>>>;
  readonly iconLink?: Maybe<Scalars['String']>;
  /** @deprecated Fallback handled automatically by iconLink. */
  readonly iconLinkFallback: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly image8xLink?: Maybe<Scalars['String']>;
  readonly image512pxLink?: Maybe<Scalars['String']>;
  /** @deprecated Use inspectImageLink instead. */
  readonly imageLink?: Maybe<Scalars['String']>;
  /** @deprecated Fallback handled automatically by inspectImageLink. */
  readonly imageLinkFallback: Scalars['String'];
  readonly inspectImageLink?: Maybe<Scalars['String']>;
  readonly lastLowPrice?: Maybe<Scalars['Int']>;
  readonly lastOfferCount?: Maybe<Scalars['Int']>;
  readonly link?: Maybe<Scalars['String']>;
  readonly loudness?: Maybe<Scalars['Int']>;
  readonly low24hPrice?: Maybe<Scalars['Int']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly normalizedName?: Maybe<Scalars['String']>;
  readonly properties?: Maybe<ItemProperties>;
  readonly receivedFromTasks: ReadonlyArray<Maybe<Task>>;
  readonly recoilModifier?: Maybe<Scalars['Float']>;
  readonly sellFor?: Maybe<ReadonlyArray<ItemPrice>>;
  readonly shortName?: Maybe<Scalars['String']>;
  /** @deprecated Use sellFor instead. */
  readonly traderPrices: ReadonlyArray<Maybe<TraderPrice>>;
  /** @deprecated Use the lang argument on queries instead. */
  readonly translation?: Maybe<ItemTranslation>;
  readonly types: ReadonlyArray<Maybe<ItemType>>;
  readonly updated?: Maybe<Scalars['String']>;
  readonly usedInTasks: ReadonlyArray<Maybe<Task>>;
  readonly velocity?: Maybe<Scalars['Float']>;
  readonly weight?: Maybe<Scalars['Float']>;
  readonly width: Scalars['Int'];
  readonly wikiLink?: Maybe<Scalars['String']>;
};


export type ItemFleaMarketFeeArgs = {
  count?: InputMaybe<Scalars['Int']>;
  hideoutManagementLevel?: InputMaybe<Scalars['Int']>;
  intelCenterLevel?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Int']>;
  requireAll?: InputMaybe<Scalars['Boolean']>;
};


export type ItemTranslationArgs = {
  languageCode?: InputMaybe<LanguageCode>;
};

export type ItemAttribute = {
  readonly __typename?: 'ItemAttribute';
  readonly name: Scalars['String'];
  readonly type: Scalars['String'];
  readonly value?: Maybe<Scalars['String']>;
};

export type ItemCategory = {
  readonly __typename?: 'ItemCategory';
  readonly children?: Maybe<ReadonlyArray<Maybe<ItemCategory>>>;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly normalizedName: Scalars['String'];
  readonly parent?: Maybe<ItemCategory>;
};

export const enum ItemCategoryName {
  Ammo = 'Ammo',
  AmmoContainer = 'AmmoContainer',
  ArmBand = 'ArmBand',
  Armor = 'Armor',
  ArmoredEquipment = 'ArmoredEquipment',
  AssaultCarbine = 'AssaultCarbine',
  AssaultRifle = 'AssaultRifle',
  AssaultScope = 'AssaultScope',
  AuxiliaryMod = 'AuxiliaryMod',
  Backpack = 'Backpack',
  Barrel = 'Barrel',
  BarterItem = 'BarterItem',
  Battery = 'Battery',
  Bipod = 'Bipod',
  BuildingMaterial = 'BuildingMaterial',
  ChargingHandle = 'ChargingHandle',
  ChestRig = 'ChestRig',
  CombMuzzleDevice = 'CombMuzzleDevice',
  CombTactDevice = 'CombTactDevice',
  CommonContainer = 'CommonContainer',
  CompactReflexSight = 'CompactReflexSight',
  Compass = 'Compass',
  CompoundItem = 'CompoundItem',
  CylinderMagazine = 'CylinderMagazine',
  Drink = 'Drink',
  Drug = 'Drug',
  Electronics = 'Electronics',
  Equipment = 'Equipment',
  EssentialMod = 'EssentialMod',
  FaceCover = 'FaceCover',
  Flashhider = 'Flashhider',
  Flashlight = 'Flashlight',
  Food = 'Food',
  FoodAndDrink = 'FoodAndDrink',
  Foregrip = 'Foregrip',
  Fuel = 'Fuel',
  FunctionalMod = 'FunctionalMod',
  GasBlock = 'GasBlock',
  GearMod = 'GearMod',
  GrenadeLauncher = 'GrenadeLauncher',
  Handguard = 'Handguard',
  Handgun = 'Handgun',
  Headphones = 'Headphones',
  Headwear = 'Headwear',
  HouseholdGoods = 'HouseholdGoods',
  Info = 'Info',
  Ironsight = 'Ironsight',
  Item = 'Item',
  Jewelry = 'Jewelry',
  Key = 'Key',
  Keycard = 'Keycard',
  Knife = 'Knife',
  LockingContainer = 'LockingContainer',
  Lubricant = 'Lubricant',
  Machinegun = 'Machinegun',
  Magazine = 'Magazine',
  Map = 'Map',
  MarksmanRifle = 'MarksmanRifle',
  MechanicalKey = 'MechanicalKey',
  MedicalItem = 'MedicalItem',
  MedicalSupplies = 'MedicalSupplies',
  Medikit = 'Medikit',
  Meds = 'Meds',
  Money = 'Money',
  Mount = 'Mount',
  MuzzleDevice = 'MuzzleDevice',
  NightVision = 'NightVision',
  Other = 'Other',
  PistolGrip = 'PistolGrip',
  PortContainer = 'PortContainer',
  PortableRangeFinder = 'PortableRangeFinder',
  RadioTransmitter = 'RadioTransmitter',
  RandomLootContainer = 'RandomLootContainer',
  Receiver = 'Receiver',
  ReflexSight = 'ReflexSight',
  RepairKits = 'RepairKits',
  Revolver = 'Revolver',
  Smg = 'SMG',
  Scope = 'Scope',
  SearchableItem = 'SearchableItem',
  Shotgun = 'Shotgun',
  Sights = 'Sights',
  Silencer = 'Silencer',
  SniperRifle = 'SniperRifle',
  SpecialItem = 'SpecialItem',
  SpecialScope = 'SpecialScope',
  SpringDrivenCylinder = 'SpringDrivenCylinder',
  StackableItem = 'StackableItem',
  Stimulant = 'Stimulant',
  Stock = 'Stock',
  TermalVision = 'TermalVision',
  ThrowableWeapon = 'ThrowableWeapon',
  Tool = 'Tool',
  Ubgl = 'UBGL',
  VisObservDevice = 'VisObservDevice',
  Weapon = 'Weapon',
  WeaponMod = 'WeaponMod'
};

export type ItemFilters = {
  readonly __typename?: 'ItemFilters';
  readonly allowedCategories: ReadonlyArray<Maybe<ItemCategory>>;
  readonly allowedItems: ReadonlyArray<Maybe<Item>>;
  readonly excludedCategories: ReadonlyArray<Maybe<ItemCategory>>;
  readonly excludedItems: ReadonlyArray<Maybe<Item>>;
};

export type ItemPrice = {
  readonly __typename?: 'ItemPrice';
  readonly currency?: Maybe<Scalars['String']>;
  readonly currencyItem?: Maybe<Item>;
  readonly price?: Maybe<Scalars['Int']>;
  readonly priceRUB?: Maybe<Scalars['Int']>;
  /** @deprecated Use vendor instead. */
  readonly requirements: ReadonlyArray<Maybe<PriceRequirement>>;
  /** @deprecated Use vendor instead. */
  readonly source?: Maybe<ItemSourceName>;
  readonly vendor: Vendor;
};

export type ItemProperties = ItemPropertiesAmmo | ItemPropertiesArmor | ItemPropertiesArmorAttachment | ItemPropertiesBackpack | ItemPropertiesBarrel | ItemPropertiesChestRig | ItemPropertiesContainer | ItemPropertiesFoodDrink | ItemPropertiesGlasses | ItemPropertiesGrenade | ItemPropertiesHeadphone | ItemPropertiesHelmet | ItemPropertiesKey | ItemPropertiesMagazine | ItemPropertiesMedKit | ItemPropertiesMedicalItem | ItemPropertiesMelee | ItemPropertiesNightVision | ItemPropertiesPainkiller | ItemPropertiesPreset | ItemPropertiesResource | ItemPropertiesScope | ItemPropertiesStim | ItemPropertiesSurgicalKit | ItemPropertiesWeapon | ItemPropertiesWeaponMod;

export type ItemPropertiesAmmo = {
  readonly __typename?: 'ItemPropertiesAmmo';
  /** @deprecated Use accuracyModifier instead. */
  readonly accuracy?: Maybe<Scalars['Int']>;
  readonly accuracyModifier?: Maybe<Scalars['Float']>;
  readonly ammoType?: Maybe<Scalars['String']>;
  readonly armorDamage?: Maybe<Scalars['Int']>;
  readonly caliber?: Maybe<Scalars['String']>;
  readonly damage?: Maybe<Scalars['Int']>;
  readonly durabilityBurnFactor?: Maybe<Scalars['Float']>;
  readonly fragmentationChance?: Maybe<Scalars['Float']>;
  readonly heatFactor?: Maybe<Scalars['Float']>;
  readonly heavyBleedModifier?: Maybe<Scalars['Float']>;
  readonly initialSpeed?: Maybe<Scalars['Float']>;
  readonly lightBleedModifier?: Maybe<Scalars['Float']>;
  readonly penetrationChance?: Maybe<Scalars['Float']>;
  readonly penetrationPower?: Maybe<Scalars['Int']>;
  readonly projectileCount?: Maybe<Scalars['Int']>;
  /** @deprecated Use recoilModifier instead. */
  readonly recoil?: Maybe<Scalars['Float']>;
  readonly recoilModifier?: Maybe<Scalars['Float']>;
  readonly ricochetChance?: Maybe<Scalars['Float']>;
  readonly stackMaxSize?: Maybe<Scalars['Int']>;
  readonly staminaBurnPerDamage?: Maybe<Scalars['Float']>;
  readonly tracer?: Maybe<Scalars['Boolean']>;
  readonly tracerColor?: Maybe<Scalars['String']>;
};

export type ItemPropertiesArmor = {
  readonly __typename?: 'ItemPropertiesArmor';
  readonly armorType?: Maybe<Scalars['String']>;
  readonly class?: Maybe<Scalars['Int']>;
  readonly durability?: Maybe<Scalars['Int']>;
  readonly ergoPenalty?: Maybe<Scalars['Int']>;
  readonly material?: Maybe<ArmorMaterial>;
  readonly repairCost?: Maybe<Scalars['Int']>;
  readonly speedPenalty?: Maybe<Scalars['Float']>;
  readonly turnPenalty?: Maybe<Scalars['Float']>;
  readonly zones?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};

export type ItemPropertiesArmorAttachment = {
  readonly __typename?: 'ItemPropertiesArmorAttachment';
  readonly blindnessProtection?: Maybe<Scalars['Float']>;
  readonly class?: Maybe<Scalars['Int']>;
  readonly durability?: Maybe<Scalars['Int']>;
  readonly ergoPenalty?: Maybe<Scalars['Int']>;
  readonly headZones?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly material?: Maybe<ArmorMaterial>;
  readonly repairCost?: Maybe<Scalars['Int']>;
  readonly speedPenalty?: Maybe<Scalars['Float']>;
  readonly turnPenalty?: Maybe<Scalars['Float']>;
};

export type ItemPropertiesBackpack = {
  readonly __typename?: 'ItemPropertiesBackpack';
  readonly capacity?: Maybe<Scalars['Int']>;
  readonly ergoPenalty?: Maybe<Scalars['Int']>;
  readonly grids?: Maybe<ReadonlyArray<Maybe<ItemStorageGrid>>>;
  /** @deprecated Use grids instead. */
  readonly pouches?: Maybe<ReadonlyArray<Maybe<ItemStorageGrid>>>;
  readonly speedPenalty?: Maybe<Scalars['Float']>;
  readonly turnPenalty?: Maybe<Scalars['Float']>;
};

export type ItemPropertiesBarrel = {
  readonly __typename?: 'ItemPropertiesBarrel';
  /** @deprecated Use centerOfImpact, deviationCurve, and deviationMax instead. */
  readonly accuracyModifier?: Maybe<Scalars['Float']>;
  readonly centerOfImpact?: Maybe<Scalars['Float']>;
  readonly deviationCurve?: Maybe<Scalars['Float']>;
  readonly deviationMax?: Maybe<Scalars['Float']>;
  readonly ergonomics?: Maybe<Scalars['Float']>;
  /** @deprecated Use recoilModifier instead. */
  readonly recoil?: Maybe<Scalars['Float']>;
  readonly recoilModifier?: Maybe<Scalars['Float']>;
  readonly slots?: Maybe<ReadonlyArray<Maybe<ItemSlot>>>;
};

export type ItemPropertiesChestRig = {
  readonly __typename?: 'ItemPropertiesChestRig';
  readonly armorType?: Maybe<Scalars['String']>;
  readonly capacity?: Maybe<Scalars['Int']>;
  readonly class?: Maybe<Scalars['Int']>;
  readonly durability?: Maybe<Scalars['Int']>;
  readonly ergoPenalty?: Maybe<Scalars['Int']>;
  readonly grids?: Maybe<ReadonlyArray<Maybe<ItemStorageGrid>>>;
  readonly material?: Maybe<ArmorMaterial>;
  /** @deprecated Use grids instead. */
  readonly pouches?: Maybe<ReadonlyArray<Maybe<ItemStorageGrid>>>;
  readonly repairCost?: Maybe<Scalars['Int']>;
  readonly speedPenalty?: Maybe<Scalars['Float']>;
  readonly turnPenalty?: Maybe<Scalars['Float']>;
  readonly zones?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};

export type ItemPropertiesContainer = {
  readonly __typename?: 'ItemPropertiesContainer';
  readonly capacity?: Maybe<Scalars['Int']>;
  readonly grids?: Maybe<ReadonlyArray<Maybe<ItemStorageGrid>>>;
};

export type ItemPropertiesFoodDrink = {
  readonly __typename?: 'ItemPropertiesFoodDrink';
  readonly energy?: Maybe<Scalars['Int']>;
  readonly hydration?: Maybe<Scalars['Int']>;
  readonly stimEffects: ReadonlyArray<Maybe<StimEffect>>;
  readonly units?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesGlasses = {
  readonly __typename?: 'ItemPropertiesGlasses';
  readonly blindnessProtection?: Maybe<Scalars['Float']>;
  readonly class?: Maybe<Scalars['Int']>;
  readonly durability?: Maybe<Scalars['Int']>;
  readonly material?: Maybe<ArmorMaterial>;
  readonly repairCost?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesGrenade = {
  readonly __typename?: 'ItemPropertiesGrenade';
  readonly contusionRadius?: Maybe<Scalars['Int']>;
  readonly fragments?: Maybe<Scalars['Int']>;
  readonly fuse?: Maybe<Scalars['Float']>;
  readonly maxExplosionDistance?: Maybe<Scalars['Int']>;
  readonly minExplosionDistance?: Maybe<Scalars['Int']>;
  readonly type?: Maybe<Scalars['String']>;
};

export type ItemPropertiesHeadphone = {
  readonly __typename?: 'ItemPropertiesHeadphone';
  readonly ambientVolume?: Maybe<Scalars['Int']>;
  readonly compressorAttack?: Maybe<Scalars['Int']>;
  readonly compressorGain?: Maybe<Scalars['Int']>;
  readonly compressorRelease?: Maybe<Scalars['Int']>;
  readonly compressorThreshold?: Maybe<Scalars['Int']>;
  readonly compressorVolume?: Maybe<Scalars['Int']>;
  readonly cutoffFrequency?: Maybe<Scalars['Int']>;
  readonly distanceModifier?: Maybe<Scalars['Float']>;
  readonly distortion?: Maybe<Scalars['Float']>;
  readonly dryVolume?: Maybe<Scalars['Int']>;
  readonly highFrequencyGain?: Maybe<Scalars['Float']>;
  readonly resonance?: Maybe<Scalars['Float']>;
};

export type ItemPropertiesHelmet = {
  readonly __typename?: 'ItemPropertiesHelmet';
  readonly armorType?: Maybe<Scalars['String']>;
  readonly blindnessProtection?: Maybe<Scalars['Float']>;
  readonly blocksHeadset?: Maybe<Scalars['Boolean']>;
  readonly class?: Maybe<Scalars['Int']>;
  readonly deafening?: Maybe<Scalars['String']>;
  readonly durability?: Maybe<Scalars['Int']>;
  readonly ergoPenalty?: Maybe<Scalars['Int']>;
  readonly headZones?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly material?: Maybe<ArmorMaterial>;
  readonly repairCost?: Maybe<Scalars['Int']>;
  readonly ricochetX?: Maybe<Scalars['Float']>;
  readonly ricochetY?: Maybe<Scalars['Float']>;
  readonly ricochetZ?: Maybe<Scalars['Float']>;
  readonly slots?: Maybe<ReadonlyArray<Maybe<ItemSlot>>>;
  readonly speedPenalty?: Maybe<Scalars['Float']>;
  readonly turnPenalty?: Maybe<Scalars['Float']>;
};

export type ItemPropertiesKey = {
  readonly __typename?: 'ItemPropertiesKey';
  readonly uses?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesMagazine = {
  readonly __typename?: 'ItemPropertiesMagazine';
  readonly allowedAmmo?: Maybe<ReadonlyArray<Maybe<Item>>>;
  readonly ammoCheckModifier?: Maybe<Scalars['Float']>;
  readonly capacity?: Maybe<Scalars['Int']>;
  readonly ergonomics?: Maybe<Scalars['Float']>;
  readonly loadModifier?: Maybe<Scalars['Float']>;
  readonly malfunctionChance?: Maybe<Scalars['Float']>;
  /** @deprecated Use recoilModifier instead. */
  readonly recoil?: Maybe<Scalars['Float']>;
  readonly recoilModifier?: Maybe<Scalars['Float']>;
  readonly slots?: Maybe<ReadonlyArray<Maybe<ItemSlot>>>;
};

export type ItemPropertiesMedKit = {
  readonly __typename?: 'ItemPropertiesMedKit';
  readonly cures?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly hitpoints?: Maybe<Scalars['Int']>;
  readonly hpCostHeavyBleeding?: Maybe<Scalars['Int']>;
  readonly hpCostLightBleeding?: Maybe<Scalars['Int']>;
  readonly maxHealPerUse?: Maybe<Scalars['Int']>;
  readonly useTime?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesMedicalItem = {
  readonly __typename?: 'ItemPropertiesMedicalItem';
  readonly cures?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly useTime?: Maybe<Scalars['Int']>;
  readonly uses?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesMelee = {
  readonly __typename?: 'ItemPropertiesMelee';
  readonly hitRadius?: Maybe<Scalars['Float']>;
  readonly slashDamage?: Maybe<Scalars['Int']>;
  readonly stabDamage?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesNightVision = {
  readonly __typename?: 'ItemPropertiesNightVision';
  readonly diffuseIntensity?: Maybe<Scalars['Float']>;
  readonly intensity?: Maybe<Scalars['Float']>;
  readonly noiseIntensity?: Maybe<Scalars['Float']>;
  readonly noiseScale?: Maybe<Scalars['Float']>;
};

export type ItemPropertiesPainkiller = {
  readonly __typename?: 'ItemPropertiesPainkiller';
  readonly cures?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly energyImpact?: Maybe<Scalars['Int']>;
  readonly hydrationImpact?: Maybe<Scalars['Int']>;
  readonly painkillerDuration?: Maybe<Scalars['Int']>;
  readonly useTime?: Maybe<Scalars['Int']>;
  readonly uses?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesPreset = {
  readonly __typename?: 'ItemPropertiesPreset';
  readonly baseItem: Item;
  readonly default?: Maybe<Scalars['Boolean']>;
  readonly ergonomics?: Maybe<Scalars['Float']>;
  readonly moa?: Maybe<Scalars['Float']>;
  readonly recoilHorizontal?: Maybe<Scalars['Int']>;
  readonly recoilVertical?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesResource = {
  readonly __typename?: 'ItemPropertiesResource';
  readonly units?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesScope = {
  readonly __typename?: 'ItemPropertiesScope';
  readonly ergonomics?: Maybe<Scalars['Float']>;
  /** @deprecated Use recoilModifier instead. */
  readonly recoil?: Maybe<Scalars['Float']>;
  readonly recoilModifier?: Maybe<Scalars['Float']>;
  readonly sightModes?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly sightingRange?: Maybe<Scalars['Int']>;
  readonly slots?: Maybe<ReadonlyArray<Maybe<ItemSlot>>>;
  readonly zoomLevels?: Maybe<ReadonlyArray<Maybe<ReadonlyArray<Maybe<Scalars['Float']>>>>>;
};

export type ItemPropertiesStim = {
  readonly __typename?: 'ItemPropertiesStim';
  readonly cures?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly stimEffects: ReadonlyArray<Maybe<StimEffect>>;
  readonly useTime?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesSurgicalKit = {
  readonly __typename?: 'ItemPropertiesSurgicalKit';
  readonly cures?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly maxLimbHealth?: Maybe<Scalars['Float']>;
  readonly minLimbHealth?: Maybe<Scalars['Float']>;
  readonly useTime?: Maybe<Scalars['Int']>;
  readonly uses?: Maybe<Scalars['Int']>;
};

export type ItemPropertiesWeapon = {
  readonly __typename?: 'ItemPropertiesWeapon';
  readonly allowedAmmo?: Maybe<ReadonlyArray<Maybe<Item>>>;
  readonly caliber?: Maybe<Scalars['String']>;
  readonly cameraRecoil?: Maybe<Scalars['Float']>;
  readonly cameraSnap?: Maybe<Scalars['Float']>;
  readonly centerOfImpact?: Maybe<Scalars['Float']>;
  readonly convergence?: Maybe<Scalars['Float']>;
  readonly defaultAmmo?: Maybe<Item>;
  readonly defaultErgonomics?: Maybe<Scalars['Float']>;
  readonly defaultHeight?: Maybe<Scalars['Int']>;
  readonly defaultPreset?: Maybe<Item>;
  readonly defaultRecoilHorizontal?: Maybe<Scalars['Int']>;
  readonly defaultRecoilVertical?: Maybe<Scalars['Int']>;
  readonly defaultWeight?: Maybe<Scalars['Float']>;
  readonly defaultWidth?: Maybe<Scalars['Int']>;
  readonly deviationCurve?: Maybe<Scalars['Float']>;
  readonly deviationMax?: Maybe<Scalars['Float']>;
  readonly effectiveDistance?: Maybe<Scalars['Int']>;
  readonly ergonomics?: Maybe<Scalars['Float']>;
  readonly fireModes?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly fireRate?: Maybe<Scalars['Int']>;
  readonly maxDurability?: Maybe<Scalars['Int']>;
  readonly presets?: Maybe<ReadonlyArray<Maybe<Item>>>;
  readonly recoilAngle?: Maybe<Scalars['Int']>;
  readonly recoilDispersion?: Maybe<Scalars['Int']>;
  readonly recoilHorizontal?: Maybe<Scalars['Int']>;
  readonly recoilVertical?: Maybe<Scalars['Int']>;
  readonly repairCost?: Maybe<Scalars['Int']>;
  readonly sightingRange?: Maybe<Scalars['Int']>;
  readonly slots?: Maybe<ReadonlyArray<Maybe<ItemSlot>>>;
};

export type ItemPropertiesWeaponMod = {
  readonly __typename?: 'ItemPropertiesWeaponMod';
  readonly accuracyModifier?: Maybe<Scalars['Float']>;
  readonly ergonomics?: Maybe<Scalars['Float']>;
  /** @deprecated Use recoilModifier instead. */
  readonly recoil?: Maybe<Scalars['Float']>;
  readonly recoilModifier?: Maybe<Scalars['Float']>;
  readonly slots?: Maybe<ReadonlyArray<Maybe<ItemSlot>>>;
};

export type ItemSlot = {
  readonly __typename?: 'ItemSlot';
  readonly filters?: Maybe<ItemFilters>;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly nameId: Scalars['String'];
  readonly required?: Maybe<Scalars['Boolean']>;
};

export const enum ItemSourceName {
  Fence = 'fence',
  FleaMarket = 'fleaMarket',
  Jaeger = 'jaeger',
  Mechanic = 'mechanic',
  Peacekeeper = 'peacekeeper',
  Prapor = 'prapor',
  Ragman = 'ragman',
  Skier = 'skier',
  Therapist = 'therapist'
};

export type ItemStorageGrid = {
  readonly __typename?: 'ItemStorageGrid';
  readonly filters: ItemFilters;
  readonly height: Scalars['Int'];
  readonly width: Scalars['Int'];
};

/**
 * The below types are all deprecated and may not return current data.
 * ItemTranslation has been replaced with the lang argument on all queries
 */
export type ItemTranslation = {
  readonly __typename?: 'ItemTranslation';
  /** @deprecated Use the lang argument on queries instead. */
  readonly description?: Maybe<Scalars['String']>;
  /** @deprecated Use the lang argument on queries instead. */
  readonly name?: Maybe<Scalars['String']>;
  /** @deprecated Use the lang argument on queries instead. */
  readonly shortName?: Maybe<Scalars['String']>;
};

export const enum ItemType {
  Ammo = 'ammo',
  AmmoBox = 'ammoBox',
  Any = 'any',
  Armor = 'armor',
  Backpack = 'backpack',
  Barter = 'barter',
  Container = 'container',
  Glasses = 'glasses',
  Grenade = 'grenade',
  Gun = 'gun',
  Headphones = 'headphones',
  Helmet = 'helmet',
  Injectors = 'injectors',
  Keys = 'keys',
  MarkedOnly = 'markedOnly',
  Meds = 'meds',
  Mods = 'mods',
  NoFlea = 'noFlea',
  PistolGrip = 'pistolGrip',
  Preset = 'preset',
  Provisions = 'provisions',
  Rig = 'rig',
  Suppressor = 'suppressor',
  Wearable = 'wearable'
};

export const enum LanguageCode {
  Cs = 'cs',
  De = 'de',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Hu = 'hu',
  It = 'it',
  Ja = 'ja',
  Ko = 'ko',
  Pl = 'pl',
  Pt = 'pt',
  Ru = 'ru',
  Sk = 'sk',
  Tr = 'tr',
  Zh = 'zh'
};

export type Map = {
  readonly __typename?: 'Map';
  readonly accessKeys: ReadonlyArray<Maybe<Item>>;
  readonly accessKeysMinPlayerLevel?: Maybe<Scalars['Int']>;
  readonly bosses: ReadonlyArray<Maybe<BossSpawn>>;
  readonly description?: Maybe<Scalars['String']>;
  readonly enemies?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly nameId?: Maybe<Scalars['String']>;
  readonly normalizedName: Scalars['String'];
  readonly players?: Maybe<Scalars['String']>;
  readonly raidDuration?: Maybe<Scalars['Int']>;
  readonly spawns?: Maybe<ReadonlyArray<Maybe<MapSpawn>>>;
  readonly tarkovDataId?: Maybe<Scalars['ID']>;
  readonly wiki?: Maybe<Scalars['String']>;
};

export type MapPosition = {
  readonly __typename?: 'MapPosition';
  readonly x: Scalars['Float'];
  readonly y: Scalars['Float'];
  readonly z: Scalars['Float'];
};

export type MapSpawn = {
  readonly __typename?: 'MapSpawn';
  readonly categories?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly position: MapPosition;
  readonly sides?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly zoneName?: Maybe<Scalars['String']>;
};

export type MobInfo = {
  readonly __typename?: 'MobInfo';
  /** equipment and items are estimates and may be inaccurate. */
  readonly equipment: ReadonlyArray<Maybe<ContainedItem>>;
  readonly health?: Maybe<ReadonlyArray<Maybe<HealthPart>>>;
  readonly id: Scalars['ID'];
  readonly imagePortraitLink?: Maybe<Scalars['String']>;
  readonly imagePosterLink?: Maybe<Scalars['String']>;
  readonly items: ReadonlyArray<Maybe<Item>>;
  readonly name: Scalars['String'];
  readonly normalizedName: Scalars['String'];
};

export type NumberCompare = {
  readonly __typename?: 'NumberCompare';
  readonly compareMethod: Scalars['String'];
  readonly value: Scalars['Float'];
};

export type OfferUnlock = {
  readonly __typename?: 'OfferUnlock';
  readonly id: Scalars['ID'];
  readonly item: Item;
  readonly level: Scalars['Int'];
  readonly trader: Trader;
};

export type PlayerLevel = {
  readonly __typename?: 'PlayerLevel';
  readonly exp: Scalars['Int'];
  readonly level: Scalars['Int'];
};

export type PriceRequirement = {
  readonly __typename?: 'PriceRequirement';
  readonly stringValue?: Maybe<Scalars['String']>;
  readonly type: RequirementType;
  readonly value?: Maybe<Scalars['Int']>;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly ammo?: Maybe<ReadonlyArray<Maybe<Ammo>>>;
  readonly armorMaterials: ReadonlyArray<Maybe<ArmorMaterial>>;
  readonly barters?: Maybe<ReadonlyArray<Maybe<Barter>>>;
  readonly bosses?: Maybe<ReadonlyArray<Maybe<MobInfo>>>;
  readonly crafts?: Maybe<ReadonlyArray<Maybe<Craft>>>;
  readonly fleaMarket: FleaMarket;
  readonly handbookCategories: ReadonlyArray<Maybe<ItemCategory>>;
  /** @deprecated Use hideoutStations instead. */
  readonly hideoutModules?: Maybe<ReadonlyArray<Maybe<HideoutModule>>>;
  readonly hideoutStations: ReadonlyArray<Maybe<HideoutStation>>;
  readonly historicalItemPrices: ReadonlyArray<Maybe<HistoricalPricePoint>>;
  readonly item?: Maybe<Item>;
  /** @deprecated Use item instead. */
  readonly itemByNormalizedName?: Maybe<Item>;
  readonly itemCategories: ReadonlyArray<Maybe<ItemCategory>>;
  readonly items: ReadonlyArray<Maybe<Item>>;
  /** @deprecated Use items instead. */
  readonly itemsByBsgCategoryId: ReadonlyArray<Maybe<Item>>;
  /** @deprecated Use items instead. */
  readonly itemsByIDs?: Maybe<ReadonlyArray<Maybe<Item>>>;
  /** @deprecated Use items instead. */
  readonly itemsByName: ReadonlyArray<Maybe<Item>>;
  /** @deprecated Use items instead. */
  readonly itemsByType: ReadonlyArray<Maybe<Item>>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly playerLevels: ReadonlyArray<Maybe<PlayerLevel>>;
  readonly questItems?: Maybe<ReadonlyArray<Maybe<QuestItem>>>;
  /** @deprecated Use tasks instead. */
  readonly quests?: Maybe<ReadonlyArray<Maybe<Quest>>>;
  readonly status: ServerStatus;
  readonly task?: Maybe<Task>;
  readonly tasks: ReadonlyArray<Maybe<Task>>;
  /** @deprecated Use traders instead. */
  readonly traderResetTimes?: Maybe<ReadonlyArray<Maybe<TraderResetTime>>>;
  readonly traders: ReadonlyArray<Maybe<Trader>>;
};


export type QueryAmmoArgs = {
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryArmorMaterialsArgs = {
  lang?: InputMaybe<LanguageCode>;
};


export type QueryBartersArgs = {
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryBossesArgs = {
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryCraftsArgs = {
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryFleaMarketArgs = {
  lang?: InputMaybe<LanguageCode>;
};


export type QueryHandbookCategoriesArgs = {
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryHideoutStationsArgs = {
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryHistoricalItemPricesArgs = {
  id: Scalars['ID'];
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryItemArgs = {
  id?: InputMaybe<Scalars['ID']>;
  lang?: InputMaybe<LanguageCode>;
  normalizedName?: InputMaybe<Scalars['String']>;
};


export type QueryItemByNormalizedNameArgs = {
  normalizedName: Scalars['String'];
};


export type QueryItemCategoriesArgs = {
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryItemsArgs = {
  bsgCategory?: InputMaybe<Scalars['String']>;
  bsgCategoryId?: InputMaybe<Scalars['String']>;
  bsgCategoryIds?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  categoryNames?: InputMaybe<ReadonlyArray<InputMaybe<ItemCategoryName>>>;
  handbookCategoryNames?: InputMaybe<ReadonlyArray<InputMaybe<HandbookCategoryName>>>;
  ids?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  names?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  offset?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<ItemType>;
  types?: InputMaybe<ReadonlyArray<InputMaybe<ItemType>>>;
};


export type QueryItemsByBsgCategoryIdArgs = {
  bsgCategoryId: Scalars['String'];
};


export type QueryItemsByIDsArgs = {
  ids: ReadonlyArray<InputMaybe<Scalars['ID']>>;
};


export type QueryItemsByNameArgs = {
  name: Scalars['String'];
};


export type QueryItemsByTypeArgs = {
  type: ItemType;
};


export type QueryMapsArgs = {
  enemies?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryQuestItemsArgs = {
  lang?: InputMaybe<LanguageCode>;
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
  lang?: InputMaybe<LanguageCode>;
};


export type QueryTasksArgs = {
  faction?: InputMaybe<Scalars['String']>;
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryTradersArgs = {
  lang?: InputMaybe<LanguageCode>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** Quest has been replaced with Task. */
export type Quest = {
  readonly __typename?: 'Quest';
  /** @deprecated Use Task type instead. */
  readonly exp: Scalars['Int'];
  /** @deprecated Use Task type instead. */
  readonly giver: Trader;
  /** @deprecated Use Task type instead. */
  readonly id: Scalars['String'];
  /** @deprecated Use Task type instead. */
  readonly objectives: ReadonlyArray<Maybe<QuestObjective>>;
  /** @deprecated Use Task type instead. */
  readonly reputation?: Maybe<ReadonlyArray<QuestRewardReputation>>;
  /** @deprecated Use Task type instead. */
  readonly requirements?: Maybe<QuestRequirement>;
  /** @deprecated Use Task type instead. */
  readonly title: Scalars['String'];
  /** @deprecated Use Task type instead. */
  readonly turnin: Trader;
  /** @deprecated Use Task type instead. */
  readonly unlocks: ReadonlyArray<Maybe<Scalars['String']>>;
  /** @deprecated Use Task type instead. */
  readonly wikiLink: Scalars['String'];
};

export type QuestItem = {
  readonly __typename?: 'QuestItem';
  readonly baseImageLink?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly gridImageLink?: Maybe<Scalars['String']>;
  readonly height?: Maybe<Scalars['Int']>;
  readonly iconLink?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly image8xLink?: Maybe<Scalars['String']>;
  readonly image512pxLink?: Maybe<Scalars['String']>;
  readonly inspectImageLink?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly normalizedName?: Maybe<Scalars['String']>;
  readonly shortName?: Maybe<Scalars['String']>;
  readonly width?: Maybe<Scalars['Int']>;
};

/** QuestObjective has been replaced with TaskObjective. */
export type QuestObjective = {
  readonly __typename?: 'QuestObjective';
  /** @deprecated Use Task type instead. */
  readonly id?: Maybe<Scalars['String']>;
  /** @deprecated Use Task type instead. */
  readonly location?: Maybe<Scalars['String']>;
  /** @deprecated Use Task type instead. */
  readonly number?: Maybe<Scalars['Int']>;
  /** @deprecated Use Task type instead. */
  readonly target?: Maybe<ReadonlyArray<Scalars['String']>>;
  /** @deprecated Use Task type instead. */
  readonly targetItem?: Maybe<Item>;
  /** @deprecated Use Task type instead. */
  readonly type: Scalars['String'];
};

/** QuestRequirement has been replaced with TaskRequirement. */
export type QuestRequirement = {
  readonly __typename?: 'QuestRequirement';
  /** @deprecated Use Task type instead. */
  readonly level?: Maybe<Scalars['Int']>;
  /** @deprecated Use Task type instead. */
  readonly prerequisiteQuests: ReadonlyArray<Maybe<ReadonlyArray<Maybe<Quest>>>>;
  /** @deprecated Use Task type instead. */
  readonly quests: ReadonlyArray<Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>>;
};

export type QuestRewardReputation = {
  readonly __typename?: 'QuestRewardReputation';
  /** @deprecated Use Task type instead. */
  readonly amount: Scalars['Float'];
  /** @deprecated Use Task type instead. */
  readonly trader: Trader;
};

export type RequirementHideoutStationLevel = {
  readonly __typename?: 'RequirementHideoutStationLevel';
  readonly id?: Maybe<Scalars['ID']>;
  readonly level: Scalars['Int'];
  readonly station: HideoutStation;
};

export type RequirementItem = {
  readonly __typename?: 'RequirementItem';
  readonly attributes?: Maybe<ReadonlyArray<Maybe<ItemAttribute>>>;
  readonly count: Scalars['Int'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly item: Item;
  readonly quantity: Scalars['Int'];
};

export type RequirementSkill = {
  readonly __typename?: 'RequirementSkill';
  readonly id?: Maybe<Scalars['ID']>;
  readonly level: Scalars['Int'];
  readonly name: Scalars['String'];
};

export type RequirementTask = {
  readonly __typename?: 'RequirementTask';
  readonly id?: Maybe<Scalars['ID']>;
  readonly task: Task;
};

export type RequirementTrader = {
  readonly __typename?: 'RequirementTrader';
  readonly compareMethod?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['ID']>;
  /** @deprecated Use value instead. */
  readonly level?: Maybe<Scalars['Int']>;
  readonly requirementType?: Maybe<Scalars['String']>;
  readonly trader: Trader;
  readonly value?: Maybe<Scalars['Int']>;
};

export const enum RequirementType {
  LoyaltyLevel = 'loyaltyLevel',
  PlayerLevel = 'playerLevel',
  QuestCompleted = 'questCompleted',
  StationLevel = 'stationLevel'
};

export type ServerStatus = {
  readonly __typename?: 'ServerStatus';
  readonly currentStatuses?: Maybe<ReadonlyArray<Maybe<Status>>>;
  readonly generalStatus?: Maybe<Status>;
  readonly messages?: Maybe<ReadonlyArray<Maybe<StatusMessage>>>;
};

export type SkillLevel = {
  readonly __typename?: 'SkillLevel';
  readonly level: Scalars['Float'];
  readonly name: Scalars['String'];
};

export type Status = {
  readonly __typename?: 'Status';
  readonly message?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly status: Scalars['Int'];
  readonly statusCode: Scalars['String'];
};

export const enum StatusCode {
  Down = 'Down',
  Ok = 'OK',
  Unstable = 'Unstable',
  Updating = 'Updating'
};

export type StatusMessage = {
  readonly __typename?: 'StatusMessage';
  readonly content: Scalars['String'];
  readonly solveTime?: Maybe<Scalars['String']>;
  readonly statusCode: Scalars['String'];
  readonly time: Scalars['String'];
  readonly type: Scalars['Int'];
};

export type StimEffect = {
  readonly __typename?: 'StimEffect';
  readonly chance: Scalars['Float'];
  readonly delay: Scalars['Int'];
  readonly duration: Scalars['Int'];
  readonly percent: Scalars['Boolean'];
  readonly skillName?: Maybe<Scalars['String']>;
  readonly type: Scalars['String'];
  readonly value: Scalars['Float'];
};

export type Task = {
  readonly __typename?: 'Task';
  readonly descriptionMessageId?: Maybe<Scalars['String']>;
  readonly experience: Scalars['Int'];
  readonly factionName?: Maybe<Scalars['String']>;
  readonly failConditions: ReadonlyArray<Maybe<TaskObjective>>;
  readonly failMessageId?: Maybe<Scalars['String']>;
  readonly failureOutcome?: Maybe<TaskRewards>;
  readonly finishRewards?: Maybe<TaskRewards>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly kappaRequired?: Maybe<Scalars['Boolean']>;
  readonly lightkeeperRequired?: Maybe<Scalars['Boolean']>;
  readonly map?: Maybe<Map>;
  readonly minPlayerLevel?: Maybe<Scalars['Int']>;
  readonly name: Scalars['String'];
  readonly neededKeys?: Maybe<ReadonlyArray<Maybe<TaskKey>>>;
  readonly normalizedName: Scalars['String'];
  readonly objectives: ReadonlyArray<Maybe<TaskObjective>>;
  readonly restartable?: Maybe<Scalars['Boolean']>;
  readonly startMessageId?: Maybe<Scalars['String']>;
  readonly startRewards?: Maybe<TaskRewards>;
  readonly successMessageId?: Maybe<Scalars['String']>;
  readonly tarkovDataId?: Maybe<Scalars['Int']>;
  readonly taskImageLink?: Maybe<Scalars['String']>;
  readonly taskRequirements: ReadonlyArray<Maybe<TaskStatusRequirement>>;
  readonly trader: Trader;
  /** @deprecated Use traderRequirements instead. */
  readonly traderLevelRequirements: ReadonlyArray<Maybe<RequirementTrader>>;
  readonly traderRequirements: ReadonlyArray<Maybe<RequirementTrader>>;
  readonly wikiLink?: Maybe<Scalars['String']>;
};

export type TaskKey = {
  readonly __typename?: 'TaskKey';
  readonly keys: ReadonlyArray<Maybe<Item>>;
  readonly map?: Maybe<Map>;
};

export type TaskObjective = {
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly type: Scalars['String'];
};

export type TaskObjectiveBasic = TaskObjective & {
  readonly __typename?: 'TaskObjectiveBasic';
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly type: Scalars['String'];
};

export type TaskObjectiveBuildItem = TaskObjective & {
  readonly __typename?: 'TaskObjectiveBuildItem';
  readonly attributes: ReadonlyArray<Maybe<AttributeThreshold>>;
  readonly containsAll: ReadonlyArray<Maybe<Item>>;
  readonly containsCategory: ReadonlyArray<Maybe<ItemCategory>>;
  /** @deprecated Use containsCategory instead. */
  readonly containsOne: ReadonlyArray<Maybe<Item>>;
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly item: Item;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly type: Scalars['String'];
};

export type TaskObjectiveExperience = TaskObjective & {
  readonly __typename?: 'TaskObjectiveExperience';
  readonly description: Scalars['String'];
  readonly healthEffect: HealthEffect;
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly type: Scalars['String'];
};

export type TaskObjectiveExtract = TaskObjective & {
  readonly __typename?: 'TaskObjectiveExtract';
  readonly description: Scalars['String'];
  readonly exitName?: Maybe<Scalars['String']>;
  readonly exitStatus: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly type: Scalars['String'];
  readonly zoneNames: ReadonlyArray<Maybe<Scalars['String']>>;
};

export type TaskObjectiveItem = TaskObjective & {
  readonly __typename?: 'TaskObjectiveItem';
  readonly count: Scalars['Int'];
  readonly description: Scalars['String'];
  readonly dogTagLevel?: Maybe<Scalars['Int']>;
  readonly foundInRaid: Scalars['Boolean'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly item: Item;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly maxDurability?: Maybe<Scalars['Int']>;
  readonly minDurability?: Maybe<Scalars['Int']>;
  readonly optional: Scalars['Boolean'];
  readonly type: Scalars['String'];
};

export type TaskObjectiveMark = TaskObjective & {
  readonly __typename?: 'TaskObjectiveMark';
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly markerItem: Item;
  readonly optional: Scalars['Boolean'];
  readonly type: Scalars['String'];
};

export type TaskObjectivePlayerLevel = TaskObjective & {
  readonly __typename?: 'TaskObjectivePlayerLevel';
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly playerLevel: Scalars['Int'];
  readonly type: Scalars['String'];
};

export type TaskObjectiveQuestItem = TaskObjective & {
  readonly __typename?: 'TaskObjectiveQuestItem';
  readonly count: Scalars['Int'];
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly questItem: QuestItem;
  readonly type: Scalars['String'];
};

export type TaskObjectiveShoot = TaskObjective & {
  readonly __typename?: 'TaskObjectiveShoot';
  readonly bodyParts: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly count: Scalars['Int'];
  readonly description: Scalars['String'];
  readonly distance?: Maybe<NumberCompare>;
  readonly enemyHealthEffect?: Maybe<HealthEffect>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly notWearing?: Maybe<ReadonlyArray<Maybe<Item>>>;
  readonly optional: Scalars['Boolean'];
  readonly playerHealthEffect?: Maybe<HealthEffect>;
  readonly shotType: Scalars['String'];
  /** @deprecated Use targetNames instead. */
  readonly target: Scalars['String'];
  readonly targetNames: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly timeFromHour?: Maybe<Scalars['Int']>;
  readonly timeUntilHour?: Maybe<Scalars['Int']>;
  readonly type: Scalars['String'];
  readonly usingWeapon?: Maybe<ReadonlyArray<Maybe<Item>>>;
  readonly usingWeaponMods?: Maybe<ReadonlyArray<Maybe<ReadonlyArray<Maybe<Item>>>>>;
  readonly wearing?: Maybe<ReadonlyArray<Maybe<ReadonlyArray<Maybe<Item>>>>>;
  readonly zoneNames: ReadonlyArray<Maybe<Scalars['String']>>;
};

export type TaskObjectiveSkill = TaskObjective & {
  readonly __typename?: 'TaskObjectiveSkill';
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly skillLevel: SkillLevel;
  readonly type: Scalars['String'];
};

export type TaskObjectiveTaskStatus = TaskObjective & {
  readonly __typename?: 'TaskObjectiveTaskStatus';
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly status: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly task: Task;
  readonly type: Scalars['String'];
};

export type TaskObjectiveTraderLevel = TaskObjective & {
  readonly __typename?: 'TaskObjectiveTraderLevel';
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly level: Scalars['Int'];
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly trader: Trader;
  readonly type: Scalars['String'];
};

export type TaskObjectiveTraderStanding = TaskObjective & {
  readonly __typename?: 'TaskObjectiveTraderStanding';
  readonly compareMethod: Scalars['String'];
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly trader: Trader;
  readonly type: Scalars['String'];
  readonly value: Scalars['Int'];
};

export type TaskObjectiveUseItem = TaskObjective & {
  readonly __typename?: 'TaskObjectiveUseItem';
  readonly compareMethod: Scalars['String'];
  readonly count: Scalars['Int'];
  readonly description: Scalars['String'];
  readonly id?: Maybe<Scalars['ID']>;
  readonly maps: ReadonlyArray<Maybe<Map>>;
  readonly optional: Scalars['Boolean'];
  readonly type: Scalars['String'];
  readonly useAny: ReadonlyArray<Maybe<Item>>;
  readonly zoneNames: ReadonlyArray<Maybe<Scalars['String']>>;
};

export type TaskRewards = {
  readonly __typename?: 'TaskRewards';
  readonly craftUnlock: ReadonlyArray<Maybe<Craft>>;
  readonly items: ReadonlyArray<Maybe<ContainedItem>>;
  readonly offerUnlock: ReadonlyArray<Maybe<OfferUnlock>>;
  readonly skillLevelReward: ReadonlyArray<Maybe<SkillLevel>>;
  readonly traderStanding: ReadonlyArray<Maybe<TraderStanding>>;
  readonly traderUnlock: ReadonlyArray<Maybe<Trader>>;
};

export type TaskStatusRequirement = {
  readonly __typename?: 'TaskStatusRequirement';
  readonly status: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly task: Task;
};

export type Trader = {
  readonly __typename?: 'Trader';
  /** barters and cashOffers are only available via the traders query. */
  readonly barters: ReadonlyArray<Maybe<Barter>>;
  readonly cashOffers: ReadonlyArray<Maybe<TraderCashOffer>>;
  readonly currency: Item;
  readonly description?: Maybe<Scalars['String']>;
  readonly discount: Scalars['Float'];
  readonly id: Scalars['ID'];
  readonly image4xLink?: Maybe<Scalars['String']>;
  readonly imageLink?: Maybe<Scalars['String']>;
  readonly levels: ReadonlyArray<TraderLevel>;
  readonly name: Scalars['String'];
  readonly normalizedName: Scalars['String'];
  readonly reputationLevels: ReadonlyArray<Maybe<TraderReputationLevel>>;
  readonly resetTime?: Maybe<Scalars['String']>;
  readonly tarkovDataId?: Maybe<Scalars['Int']>;
};

export type TraderCashOffer = {
  readonly __typename?: 'TraderCashOffer';
  readonly currency?: Maybe<Scalars['String']>;
  readonly currencyItem?: Maybe<Item>;
  readonly item: Item;
  readonly minTraderLevel?: Maybe<Scalars['Int']>;
  readonly price?: Maybe<Scalars['Int']>;
  readonly priceRUB?: Maybe<Scalars['Int']>;
  readonly taskUnlock?: Maybe<Task>;
};

export type TraderLevel = {
  readonly __typename?: 'TraderLevel';
  /** barters and cashOffers are only available via the traders query. */
  readonly barters: ReadonlyArray<Maybe<Barter>>;
  readonly cashOffers: ReadonlyArray<Maybe<TraderCashOffer>>;
  readonly id: Scalars['ID'];
  readonly image4xLink?: Maybe<Scalars['String']>;
  readonly imageLink?: Maybe<Scalars['String']>;
  readonly insuranceRate?: Maybe<Scalars['Float']>;
  readonly level: Scalars['Int'];
  readonly payRate: Scalars['Float'];
  readonly repairCostMultiplier?: Maybe<Scalars['Float']>;
  readonly requiredCommerce: Scalars['Int'];
  readonly requiredPlayerLevel: Scalars['Int'];
  readonly requiredReputation: Scalars['Float'];
};

export const enum TraderName {
  Fence = 'fence',
  Jaeger = 'jaeger',
  Mechanic = 'mechanic',
  Peacekeeper = 'peacekeeper',
  Prapor = 'prapor',
  Ragman = 'ragman',
  Skier = 'skier',
  Therapist = 'therapist'
};

export type TraderOffer = Vendor & {
  readonly __typename?: 'TraderOffer';
  readonly minTraderLevel?: Maybe<Scalars['Int']>;
  readonly name: Scalars['String'];
  readonly normalizedName: Scalars['String'];
  readonly taskUnlock?: Maybe<Task>;
  readonly trader: Trader;
};

/** TraderPrice is deprecated and replaced with ItemPrice. */
export type TraderPrice = {
  readonly __typename?: 'TraderPrice';
  /** @deprecated Use item.buyFor instead. */
  readonly currency: Scalars['String'];
  /** @deprecated Use item.buyFor instead. */
  readonly price: Scalars['Int'];
  /** @deprecated Use item.buyFor instead. */
  readonly priceRUB: Scalars['Int'];
  /** @deprecated Use item.buyFor instead. */
  readonly trader: Trader;
};

export type TraderReputationLevel = TraderReputationLevelFence;

export type TraderReputationLevelFence = {
  readonly __typename?: 'TraderReputationLevelFence';
  readonly availableScavExtracts?: Maybe<Scalars['Int']>;
  readonly extractPriceModifier?: Maybe<Scalars['Float']>;
  readonly hostileBosses?: Maybe<Scalars['Boolean']>;
  readonly hostileScavs?: Maybe<Scalars['Boolean']>;
  readonly minimumReputation: Scalars['Int'];
  readonly priceModifier?: Maybe<Scalars['Float']>;
  readonly scavAttackSupport?: Maybe<Scalars['Boolean']>;
  readonly scavCaseTimeModifier?: Maybe<Scalars['Float']>;
  readonly scavCooldownModifier?: Maybe<Scalars['Float']>;
  readonly scavEquipmentSpawnChanceModifier?: Maybe<Scalars['Float']>;
  readonly scavFollowChance?: Maybe<Scalars['Float']>;
};

/** TraderResetTime is deprecated and replaced with Trader. */
export type TraderResetTime = {
  readonly __typename?: 'TraderResetTime';
  /** @deprecated Use Trader.name type instead. */
  readonly name?: Maybe<Scalars['String']>;
  /** @deprecated Use Trader.resetTime type instead. */
  readonly resetTimestamp?: Maybe<Scalars['String']>;
};

export type TraderStanding = {
  readonly __typename?: 'TraderStanding';
  readonly standing: Scalars['Float'];
  readonly trader: Trader;
};

export type Vendor = {
  readonly name: Scalars['String'];
  readonly normalizedName: Scalars['String'];
};

export type HistoricalPricePoint = {
  readonly __typename?: 'historicalPricePoint';
  readonly price?: Maybe<Scalars['Int']>;
  readonly timestamp?: Maybe<Scalars['String']>;
};
