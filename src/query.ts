import { gql } from "@apollo/client";
import { LanguageCode } from "./graphql/generated";

export const GET_TASKS = (lang: LanguageCode) => {
  return gql`
    query GetTasks {
      tasks(lang: ${lang}) {
        id
        name
        normalizedName
        experience
        minPlayerLevel
        neededKeys{
          keys{
            id
            name
            category{
              name
            }
            iconLink
          }
        }
        traderRequirements {
          trader {
            id
            name
          }
          value
        }
        taskRequirements {
          task {
            id
            name
            trader{
              name
            }
          }
          status
        }
        kappaRequired
        lightkeeperRequired
        map {
          name
        }
        trader {
          id
          name
        }
        factionName
        objectives {
          ... on TaskObjectiveBasic {
            description
          }
          ... on TaskObjectiveBuildItem {
            attributes {
              name
              requirement{
                compareMethod
                value
              }
            }
            containsAll {
              id
              name
              inspectImageLink
              category{
                name
              }
              iconLink
            }
            containsCategory {
              name
              normalizedName
            }
            description
            item {
              name
              iconLink
            }
            maps {
              name
            }
            optional
          }
          ... on TaskObjectiveExperience {
            description
            maps {
              name
            }
            optional
          }
          ... on TaskObjectiveExtract {
            description
            maps {
              name
            }
            optional
          }
          ... on TaskObjectiveItem {
            count
            description
            dogTagLevel
            foundInRaid
            item {
              id
              name
              inspectImageLink
              iconLink
              category{
                name
              }
            }
            maps {
              name
            }
            maxDurability
            minDurability
            optional
            type
          }
          ... on TaskObjectiveMark {
            description
            maps {
              name
            }
            markerItem {
              name
            }
            optional
          }
          ... on TaskObjectivePlayerLevel {
            description
            maps {
              name
            }
            optional
            playerLevel
          }
          ... on TaskObjectiveQuestItem {
            count
            description
            maps {
              name
            }
            optional
            questItem {
              name
            }
          }
          ... on TaskObjectiveShoot {
            count
            description
            distance {
              compareMethod
              value
            }
          }
          ... on TaskObjectiveSkill {
            description
            maps {
              name
            }
            optional
            skillLevel {
              name
              level
            }
          }
          ... on TaskObjectiveTaskStatus {
            description
            maps {
              name
            }
            optional
            task {
              name
            }
          }
          ... on TaskObjectiveTraderLevel {
            description
            level
            maps {
              name
            }
            optional
            trader {
              name
            }
          }
        }
        startRewards {
          traderStanding {
            trader {
              name
            }
            standing
          }
          items {
            item {
              id
              name
              iconLink
              category{
                name
              }
            }
            count
            quantity
            attributes {
              type
              name
              value
            }
          }
          offerUnlock {
            trader {
              name
            }
            level
            item {
              id
              name
              iconLink
              category{
                name
              }
            }
          }
          skillLevelReward {
            name
            level
          }
          traderUnlock {
            name
          }
          craftUnlock {
            station {
              name
            }
            level
            taskUnlock {
              name
            }
          }
        }
        finishRewards {
          traderStanding {
            trader {
              name
            }
            standing
          }
          items {
            item {
              id
              name
              iconLink
              category{
                name
              }
            }
            count
            quantity
            attributes {
              type
              name
              value
            }
          }
          offerUnlock {
            trader {
              name
            }
            level
            item {
              id
              name
              iconLink
              category{
                name
              }
            }
          }
          skillLevelReward {
            name
            level
          }
          traderUnlock {
            name
          }
        }
      }
    }
  `;
};

export const GET_ITEMS = (lang: LanguageCode) => {
  return gql`
  query GetItems(
    $categoryNames: [ItemCategoryName]
    $withCategory: Boolean!
  ) {
    itemsWithCategories: items(categoryNames: $categoryNames, lang: ${lang})
      @include(if: $withCategory) {
      id
      name
      normalizedName
      shortName
      category {
        name
        normalizedName
      }
      bartersFor{
        level
        requiredItems{
          attributes{
            name
            type
            value
          }
          count
          item{
            name
            iconLink
          }
          quantity
        }
        trader{
          name
        }
        taskUnlock{
          id
          name
        }
      }
      basePrice
      width
      height
      weight
      image512pxLink
      wikiLink
      usedInTasks {
        id
        name
        trader {
          name
        }
      }
      sellFor{
        price
        vendor{
          name
        }
        currency
        priceRUB
      }
      buyFor{
        price
        vendor{
          name
        }
        currency
        priceRUB
      }
      properties {
        ... on ItemPropertiesAmmo {
          ammoType
          caliber
        }
      }
    }
    itemsWithoutCategories: items @skip(if: $withCategory) {
      id
      name
      normalizedName
      shortName
      category {
        name
        normalizedName
      }
      bartersFor{
        level
        requiredItems{
          attributes{
            name
            type
            value
          }
          count
          item{
            name
            iconLink
          }
          quantity
        }
        trader{
          name
        }
        taskUnlock{
          id
          name
        }
      }
      basePrice
      width
      height
      weight
      image512pxLink
      wikiLink
      usedInTasks {
        id
        name
        trader {
          name
        }
      }
      sellFor{
        price
        vendor{
          name
        }
        currency
        priceRUB
      }
      buyFor{
        price
        vendor{
          name
        }
        currency
        priceRUB
      }
      properties {
        ... on ItemPropertiesAmmo {
          ammoType
          caliber
        }
      }
    }
  }
`;
};

export const GET_CASH_OFFERS = gql`
  query getCashOffers {
    traders {
      name
      cashOffers {
        item {
          id
          name
        }
        minTraderLevel
        taskUnlock {
          name
        }
      }
    }
  }
`;

export const GET_SERVER_STATUS = gql`
  query getServerStatus {
    status {
      currentStatuses {
        message
        name
        status
        statusCode
      }
      generalStatus {
        message
        name
        status
        statusCode
      }
      messages {
        content
        solveTime
        statusCode
        time
        type
      }
    }
  }
`;

export const GET_BOSS_SPAWN = gql`
  query getBossSpawn {
    maps {
      name
      bosses {
        boss {
          name
          imagePosterLink
          imagePortraitLink
        }
        spawnLocations {
          name
          chance
        }
        spawnChance
        spawnTime
        spawnTimeRandom
        spawnTrigger
      }
    }
  }
`;

export const GET_ARMOR_MATERIAL = gql`
  query getArmorMaterial($lang: Language) {
    armorMaterials(lang: $lang) {
      id
      name
    }
  }
`;

export const GET_ITEM_PRICE = gql`
  query GetItemPrice($ids: [ID]) {
    items(ids: $ids) {
      id
      name
      normalizedName
      category {
        name
      }
      basePrice
      changeLast48h
      changeLast48hPercent
      low24hPrice
      high24hPrice
      avg24hPrice
      image512pxLink
      sellFor {
        price
        vendor {
          name
        }
        currency
        priceRUB
      }
    }
  }
`;

export const GET_ITEM_PRICE_HISTORY = gql`
  query GetItemPriceHistory($id: ID!) {
    historicalItemPrices(id: $id) {
      price
      timestamp
    }
  }
`;

export const GET_ITEM_PROPERTIES_ARMOR = (lang: LanguageCode) => {
  return gql`
      query getItemProperties($itemId: ID) {
        item(id: $itemId, lang: ${lang}) {
          properties {
            ... on ItemPropertiesArmor {
              class
              durability
              ergoPenalty
              material {
                name
              }
              repairCost
              speedPenalty
              turnPenalty
              zones
            }
          }
        }
      }
    `;
};

export const GET_ITEM_PROPERTIES_AMMO = (lang: LanguageCode) => {
  return gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesAmmo {
          damage
          armorDamage
          penetrationPower
          caliber
          stackMaxSize
          tracer
          tracerColor
          fragmentationChance
          ricochetChance
          penetrationChance
          accuracyModifier
          recoilModifier
          initialSpeed
          lightBleedModifier
          heavyBleedModifier
          durabilityBurnFactor
          heatFactor
        }
      }
    }
  }
`;
};

export const GET_ITEM_PROPERTIES_ARMOR_ATTACHMENT = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesArmorAttachment {
          blindnessProtection
          class
          durability
          ergoPenalty
          headZones
          material {
            id
            name
          }
          repairCost
          speedPenalty
          turnPenalty
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_BACKPACK = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesBackpack {
          capacity
          grids {
            filters {
              allowedCategories {
                name
              }
              allowedItems {
                name
              }
              excludedCategories {
                name
              }
              excludedItems {
                name
              }
            }
          }
          ergoPenalty
          speedPenalty
          turnPenalty
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_BARREL = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesBarrel {
          centerOfImpact
          deviationCurve
          deviationMax
          ergonomics
          recoilModifier
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_CHEST_RIG = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesChestRig {
          capacity
          class
          durability
          ergoPenalty
          material {
            name
          }
          repairCost
          speedPenalty
          turnPenalty
          zones
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_CONTAINER = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesContainer {
          capacity
          grids {
            filters {
              allowedCategories {
                name
              }
              allowedItems {
                name
              }
              excludedCategories {
                name
              }
              excludedItems {
                name
              }
            }
            width
            height
          }
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_FOOD_DRINK = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesFoodDrink {
          energy
          hydration
          stimEffects {
            chance
            delay
            duration
            percent
            skillName
            type
            value
          }
          units
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_GLASSES = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesGlasses {
          blindnessProtection
          class
          durability
          material {
            name
          }
          repairCost
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_GRENADE = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesGrenade {
          contusionRadius
          fragments
          fuse
          maxExplosionDistance
          minExplosionDistance
          type
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_HELMET = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesHelmet {
          blindnessProtection
          blocksHeadset
          class
          deafening
          durability
          ergoPenalty
          headZones
          material {
            name
          }
          repairCost
          speedPenalty
          turnPenalty
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_KEY = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesKey {
          uses
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_MAGAZINE = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesMagazine {
          ammoCheckModifier
          capacity
          ergonomics
          loadModifier
          malfunctionChance
          recoilModifier
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_MEDICAL_ITEM = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesMedicalItem {
          cures
          useTime
          uses
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_MED_KIT = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesMedKit {
          cures
          hitpoints
          hpCostHeavyBleeding
          hpCostLightBleeding
          maxHealPerUse
          useTime
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_MELEE = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesMelee {
          hitRadius
          slashDamage
          stabDamage
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_NIGHT_VISION = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesNightVision {
          diffuseIntensity
          intensity
          noiseIntensity
          noiseScale
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_PAINKILLER = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesPainkiller {
          cures
          energyImpact
          hydrationImpact
          painkillerDuration
          useTime
          uses
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_PRESET = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesPreset {
          ergonomics
          moa
          recoilHorizontal
          recoilVertical
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_SCOPE = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesScope {
          ergonomics
          recoilModifier
          sightModes
          sightingRange
          zoomLevels
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_STIM = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesStim {
          cures
          stimEffects {
            chance
            delay
            duration
            percent
            skillName
            type
            value
          }
          useTime
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_SURGICAL_KIT = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesSurgicalKit {
          cures
          maxLimbHealth
          minLimbHealth
          useTime
          uses
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_WEAPON = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesWeapon {
          caliber
          centerOfImpact
          deviationCurve
          deviationMax
          effectiveDistance
          ergonomics
          fireModes
          fireRate
          recoilHorizontal
          recoilVertical
          repairCost
          sightingRange
        }
      }
    }
  }
`)};

export const GET_ITEM_PROPERTIES_WEAPON_MOD = (lang: LanguageCode) => {
  return (gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId, lang: ${lang}) {
      properties {
        ... on ItemPropertiesWeaponMod {
          accuracyModifier
          ergonomics
          recoilModifier
        }
      }
    }
  }
`)};
