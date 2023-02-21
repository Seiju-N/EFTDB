// TODO:この型定義なくす

type ServerStatus = {
  [key: string]: string;
}

type ArmorMaterial = {
  name:string,
  id:string,
}

type HomeSentence = {
  welcome_msg: string;
  discord_server: string;
  search_item: string;
  search_task: string;
  server_status: ServerStatus;
}

type ItemDetailDialog ={
  [key: string]: string;
}

type MenuSentence = {
  task: string;
  item: string;
}

type ItemType = {
  [key: string]: string;
}

type ItemCategoryName = {
  [key: string]: string;
}
type ItemProperties = {
  [key: string]: string;
}



export type DictType = {
  HOME_SENTENCE: HomeSentence;
  MENU_SENTENCE: MenuSentence;
  ITEM_TYPE: ItemType;
  ITEM_CATEGORY_NAME: ItemCategoryName;
  ARMOR_MATERIAL: ArmorMaterial[];
  ITEM_PROPERTIES:ItemProperties;
  ITEM_PROPERTIES_AMMO:ItemProperties;
  ITEM_PROPERTIES_ARMOR:ItemProperties;
  ITEM_PROPERTIES_ARMOR_ATTACHMENT:ItemProperties;
  ITEM_PROPERTIES_BACKPACK:ItemProperties;
  ITEM_PROPERTIES_BARREL:ItemProperties;
  ITEM_PROPERTIES_CHEST_RIG:ItemProperties;
  ITEM_PROPERTIES_CONTAINER:ItemProperties;
  ITEM_PROPERTIES_FOOD_DRINK:ItemProperties;
  ITEM_PROPERTIES_GLASSES:ItemProperties;
  ITEM_PROPERTIES_GRENADE:ItemProperties;
  ITEM_PROPERTIES_HELMET:ItemProperties;
  ITEM_PROPERTIES_KEY:ItemProperties;
  ITEM_PROPERTIES_MAGAZINE:ItemProperties;
  ITEM_PROPERTIES_MEDKIT:ItemProperties;
  ITEM_PROPERTIES_MEDICAL_ITEM:ItemProperties;
  ITEM_PROPERTIES_MELEE:ItemProperties;
  ITEM_PROPERTIES_NIGHT_VISION:ItemProperties;
  ITEM_PROPERTIES_PAINKILLER:ItemProperties;
  ITEM_PROPERTIES_PRESET:ItemProperties;
  ITEM_PROPERTIES_SCOPE:ItemProperties;
  ITEM_PROPERTIES_STIM:ItemProperties;
  ITEM_PROPERTIES_SURGICAL_KIT:ItemProperties;
  ITEM_PROPERTIES_WEAPON:ItemProperties;
  ITEM_PROPERTIES_WEAPON_MOD:ItemProperties;
  ITEM_DETAIL_DIALOG:ItemDetailDialog;
}

 