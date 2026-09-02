import { List, ListItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import {
  CustomSkelton,
  translateMaterialName,
} from "@/ItemList/DetailDialog/utils";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { useItemProperties } from "@/api/hooks";

type Props = {
  ItemId: string;
};

export const Helmet = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_HELMET, ARMOR_MATERIAL } =
    useContext(LanguageDictContext);
  const { loading, error, data } = useItemProperties(ItemId, lang);

  if (loading) return <Loading />;
  if (!data || error) return null;
  const properties = data.item.properties;

  return (
    <>
      {properties ? (
        <>
          <Grid container sx={{ minHeight: 80, fontSize: "0.7rem" }}>
            {properties.class ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.class}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.class}
                </Grid>
              </>
            ) : null}
            {properties.blindnessProtection ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.blindnessProtection}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.blindnessProtection}
                </Grid>
              </>
            ) : null}
            {properties.blocksHeadset ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.blocksHeadset}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.blocksHeadset}
                </Grid>
              </>
            ) : null}
            {properties.deafening ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.deafening}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.deafening}
                </Grid>
              </>
            ) : null}
            {properties.material ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.material}
                </Grid>
                <Grid xs={6} md={3}>
                  {translateMaterialName(
                    properties.material,
                    ARMOR_MATERIAL
                  )}
                </Grid>
              </>
            ) : null}
            {properties.headZones ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.headZones}
                </Grid>
                <Grid xs={6} md={3}>
                  <List disablePadding>
                    {properties.headZones.map((zone: string) => (
                      <ListItem disablePadding disableGutters key={zone}>
                        {zone}
                      </ListItem>
                    ))}
                  </List>
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
