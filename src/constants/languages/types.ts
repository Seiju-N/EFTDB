export type dictType = {
  HOME_SENTENCE: {
    welcome_msg: string,
    discord_server: string,
    search_item: string,
    search_task: string,
    server_status: Record<string, string>,
    subtitle: {
      subtitle1: string,
      simple: {
        primary: string,
        secondary: string
      },
      accurate: {
        primary: string,
        secondary: string
      },
      fast: {
        primary: string,
        secondary: string
      }
    }
  },
  FOOTER_SENTENCE: Record<string, string>,
  TASK_COLUMN: Record<string, string>,
  ITEM_DETAIL_DIALOG: Record<string, string>,
  MENU_SENTENCE: Record<string, string>,
  ARMOR_MATERIAL: Record<string, string>[],
  ITEM_PROPERTIES: {
    [key: string]: string;
  },
  ITEM_PROPERTIES_AMMO: Record<string, string>,
  ITEM_PROPERTIES_ARMOR: Record<string, string>,
  ITEM_PROPERTIES_ARMOR_ATTACHMENT: Record<string, string>,
  ITEM_PROPERTIES_BACKPACK: Record<string, string>,
  ITEM_PROPERTIES_BARREL: Record<string, string>,
  ITEM_PROPERTIES_CHEST_RIG: Record<string, string>,
  ITEM_PROPERTIES_CONTAINER: Record<string, string>,
  ITEM_PROPERTIES_FOOD_DRINK: Record<string, string>,
  ITEM_PROPERTIES_GLASSES: Record<string, string>,
  ITEM_PROPERTIES_GRENADE: Record<string, string>,
  ITEM_PROPERTIES_HELMET: Record<string, string>,
  ITEM_PROPERTIES_KEY: Record<string, string>,
  ITEM_PROPERTIES_MAGAZINE: Record<string, string>,
  ITEM_PROPERTIES_MEDKIT: Record<string, string>,
  ITEM_PROPERTIES_MEDICAL_ITEM: Record<string, string>,
  ITEM_PROPERTIES_MELEE: Record<string, string>,
  ITEM_PROPERTIES_NIGHT_VISION: Record<string, string>,
  ITEM_PROPERTIES_PAINKILLER: Record<string, string>,
  ITEM_PROPERTIES_PRESET: Record<string, string>,
  ITEM_PROPERTIES_SCOPE: Record<string, string>,
  ITEM_PROPERTIES_STIM: Record<string, string>,
  ITEM_PROPERTIES_SURGICAL_KIT: Record<string, string>,
  ITEM_PROPERTIES_WEAPON: Record<string, string>,
  ITEM_PROPERTIES_WEAPON_MOD: Record<string, string>,
  ITEM_TYPE: Record<string, string>,
  ITEM_CATEGORY_NAME: Record<string, string>,
}