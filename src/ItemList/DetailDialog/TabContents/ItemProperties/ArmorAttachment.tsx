import { LanguageContext, LanguageDictContext } from "@/App";
import { useItemProperties } from "@/api/hooks";
import { List, ListItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import {
  CustomSkelton,
  translateMaterialName,
} from "@/ItemList/DetailDialog/utils";
import { Loading } from "./Loading";

type Props = {
  ItemId: string;
};

export const ArmorAttachment = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_ARMOR_ATTACHMENT, ARMOR_MATERIAL, HEAD_ZONES } =
    useContext(LanguageDictContext);
  const { loading, error, data } = useItemProperties(ItemId, lang);
  if (loading) return <Loading />;
  if (!data || error) return null;
  const properties = data.item.properties;

  return (
    <>
      {properties ? (
        <>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.class ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR_ATTACHMENT.class}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.class}
                </Grid>
              </>
            ) : null}
            {properties.durability ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR_ATTACHMENT.durability}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.durability}
                </Grid>
              </>
            ) : null}
            {properties.blindnessProtection ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR_ATTACHMENT.blindnessProtection}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.blindnessProtection}
                </Grid>
              </>
            ) : null}
            {properties.headZones ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR_ATTACHMENT.headZones}
                </Grid>
                <Grid xs={6} md={3}>
                  <List disablePadding>
                    {properties.headZones.map((headZone: string) => (
                      <ListItem disableGutters disablePadding key={headZone}>
                        {headZone ? HEAD_ZONES[headZone] : null}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </>
            ) : null}
            {properties.material ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR_ATTACHMENT.material}
                </Grid>
                <Grid xs={6} md={3}>
                  {translateMaterialName(
                    properties.material,
                    ARMOR_MATERIAL
                  )}
                </Grid>
              </>
            ) : null}
            {properties.ergoPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR_ATTACHMENT.ergoPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.ergoPenalty}
                </Grid>
              </>
            ) : null}
            {properties.speedPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR_ATTACHMENT.speedPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.speedPenalty}
                </Grid>
              </>
            ) : null}
            {properties.turnPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR_ATTACHMENT.turnPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.turnPenalty}
                </Grid>
              </>
            ) : null}
          </Grid>
        </>
      ) : (
        <CustomSkelton />
      )}
    </>
  );
};
