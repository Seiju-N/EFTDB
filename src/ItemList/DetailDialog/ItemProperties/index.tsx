import { Ammo } from "./Ammo";
import { Armor } from "./Armor";
import { ArmorAttachment } from "./ArmorAttachment";
import { Backpack } from "./Backpack";
import { Barrel } from "./Barrel";
import { ChestRig } from "./ChestRig";
import { Container } from "./Container";
import { FoodDrink } from "./FoodDrink";
import { Glasses } from "./Glasses";
import { Grenade } from "./Grenade";
import { Helmet } from "./Helmet";
import { Key } from "./Key";
import { Magazine } from "./Magazine";
import { MedicalItem } from "./MedicalItem";
import { MedKit } from "./MedKit";
import { Melee } from "./Melee";
import { NightVision } from "./NightVision";
import { Painkiller } from "./Painkiller";
import { Preset } from "./Preset";
import { Scope } from "./Scope";
import { Stim } from "./Stim";
import { SurgicalKit } from "./SurgicalKit";
import { Weapon } from "./Weapon";
import { WeaponMod } from "./WeaponMod";

type Props = {
  typeName: string;
  ItemId: string;
};

export const ItemProperties = ({ typeName, ItemId }: Props) => {
  switch (typeName) {
    case "ItemPropertiesAmmo":
      return <Ammo ItemId={ItemId} />;
    case "ItemPropertiesArmor":
      return <Armor ItemId={ItemId} />;
    case "ItemPropertiesArmorAttachment":
      return <ArmorAttachment ItemId={ItemId} />;
    case "ItemPropertiesBackpack":
      return <Backpack ItemId={ItemId} />;
    case "ItemPropertiesBarrel":
      return <Barrel ItemId={ItemId} />;
    case "ItemPropertiesChestRig":
      return <ChestRig ItemId={ItemId} />;
    case "ItemPropertiesContainer":
      return <Container ItemId={ItemId} />;
    case "ItemPropertiesFoodDrink":
      return <FoodDrink ItemId={ItemId} />;
    case "ItemPropertiesGlasses":
      return <Glasses ItemId={ItemId} />;
    case "ItemPropertiesGrenade":
      return <Grenade ItemId={ItemId} />;
    case "ItemPropertiesHelmet":
      return <Helmet ItemId={ItemId} />;
    case "ItemPropertiesKey":
      return <Key ItemId={ItemId} />;
    case "ItemPropertiesMagazine":
      return <Magazine ItemId={ItemId} />;
    case "ItemPropertiesMedKit":
      return <MedKit ItemId={ItemId} />;
    case "ItemPropertiesMedicalItem":
      return <MedicalItem ItemId={ItemId} />;
    case "ItemPropertiesMelee":
      return <Melee ItemId={ItemId} />;
    case "ItemPropertiesNightVision":
      return <NightVision ItemId={ItemId} />;
    case "ItemPropertiesPainkiller":
      return <Painkiller ItemId={ItemId} />;
    case "ItemPropertiesPreset":
      return <Preset ItemId={ItemId} />;
    case "ItemPropertiesScope":
      return <Scope ItemId={ItemId} />;
    case "ItemPropertiesStim":
      return <Stim ItemId={ItemId} />;
    case "ItemPropertiesSurgicalKit":
      return <SurgicalKit ItemId={ItemId} />;
    case "ItemPropertiesWeapon":
      return <Weapon ItemId={ItemId} />;
    case "ItemPropertiesWeaponMod":
      return <WeaponMod ItemId={ItemId} />;
    default:
      return <></>;
  }
};
