import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks($lang: LanguageCode) {
    tasks(lang: $lang) {
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
          }
          containsCategory {
            name
            normalizedName
          }
          description
          item {
            name
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

export const GET_ITEMS = gql`
  query GetItems(
    $categoryNames: [ItemCategoryName]
    $skipCategoryNames: Boolean!
  ) {
    itemsWithCategories: items(categoryNames: $categoryNames)
      @include(if: $skipCategoryNames) {
      id
      name
      normalizedName
      shortName
      category {
        name
      }
      basePrice
      width
      height
      types
      image512pxLink
      wikiLink
      usedInTasks {
        id
        name
        trader {
          name
        }
      }
      properties {
        ... on ItemPropertiesAmmo {
          ammoType
          caliber
        }
      }
    }
    itemsWithoutCategories: items @skip(if: $skipCategoryNames) {
      id
      name
      normalizedName
      shortName
      category {
        name
      }
      basePrice
      width
      height
      types
      image512pxLink
      wikiLink
      usedInTasks {
        id
        name
        trader {
          name
        }
      }
      properties {
        __typename
      }
    }
  }
`;

export const GET_ITEM_PROPERTIES_ARMOR = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
      properties {
        ... on ItemPropertiesArmor {
          class
          durability
          ergoPenalty
          material {
            id
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

export const GET_ITEM_PROPERTIES_AMMO = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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

export const GET_ITEM_PROPERTIES_ARMOR_ATTACHMENT = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
      properties {
        ... on ItemPropertiesArmorAttachment {
          blindnessProtection
          class
          durability
          ergoPenalty
          headZones
          material {
            id
          }
          repairCost
          speedPenalty
          turnPenalty
        }
      }
    }
  }
`;

export const GET_ITEM_PROPERTIES_BACKPACK = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_BARREL = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_CHEST_RIG = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_CONTAINER = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_FOOD_DRINK = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_GLASSES = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_GRENADE = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_HELMET = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
            id
          }
          repairCost
          speedPenalty
          turnPenalty
        }
      }
    }
  }
`;

export const GET_ITEM_PROPERTIES_KEY = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
      properties {
        ... on ItemPropertiesKey {
          uses
        }
      }
    }
  }
`;

export const GET_ITEM_PROPERTIES_MAGAZINE = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_MEDICAL_ITEM = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
      properties {
        ... on ItemPropertiesMedicalItem {
          cures
          useTime
          uses
        }
      }
    }
  }
`;

export const GET_ITEM_PROPERTIES_MED_KIT = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_MELEE = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesMelee {
          hitRadius
          slashDamage
          stabDamage
        }
      }
    }
  }
`;

export const GET_ITEM_PROPERTIES_NIGHT_VISION = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_PAINKILLER = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_PRESET = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_SCOPE = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_STIM = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_SURGICAL_KIT = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_WEAPON = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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
`;

export const GET_ITEM_PROPERTIES_WEAPON_MOD = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
      properties {
        ... on ItemPropertiesWeaponMod {
          accuracyModifier
          ergonomics
          recoilModifier
        }
      }
    }
  }
`;
