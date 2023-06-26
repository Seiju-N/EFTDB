import { Card, List } from "@mui/material";
import { memo } from "react";
import { useHooks } from "./hooks";

export const ItemCategoryList = memo(() => {
  const {
    FlatCategory,
    NestedCategory,
    NestedSubcategory,
    langDict,
    categories,
    MenuTitle,
  } = useHooks();
  return (
    <Card>
      <MenuTitle titleStr={langDict.HOME_SENTENCE.search_item} />
      {categories?.length === 0 || categories === undefined ? null : (
        <List component="div">
          <FlatCategory categoryName="Ammo" />
          <FlatCategory categoryName="Arm band" />
          <NestedSubcategory categoryName="Armored equipment" />
          <FlatCategory categoryName="Backpack" />
          <NestedCategory categoryName="Barter item" />
          <FlatCategory categoryName="Chest rig" />
          <FlatCategory categoryName="Common container" />
          <NestedCategory categoryName="Food and drink" />
          <FlatCategory categoryName="Headphones" />
          <FlatCategory categoryName="Info" />
          <NestedCategory categoryName="Key" />
          <FlatCategory categoryName="Knife" />
          <FlatCategory categoryName="Map" />
          <NestedCategory categoryName="Meds" />
          <FlatCategory categoryName="Port. container" />
          <FlatCategory categoryName="Special item" />
          <FlatCategory categoryName="Throwable weapon" />
          <NestedSubcategory categoryName="Weapon mod" />
          <NestedCategory categoryName="Weapon" />
        </List>
      )}
    </Card>
  );
});
