import { List, ListItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import {
  convertPercent,
  CustomSkelton,
  translateMaterialName,
} from "@/ItemList/DetailDialog/utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesChestRig } from "@/graphql/generated";
import { LanguageContext, LanguageDictContext } from "@/App";
import { GET_ITEM_PROPERTIES_CHEST_RIG } from "@/query";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesChestRig | null;
  };
};

export const ChestRig = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_CHEST_RIG, ARMOR_MATERIAL, BODY_ZONES } =
    useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_CHEST_RIG(lang),
    {
      variables: {
        itemId: ItemId,
      },
    }
  );
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
                  {ITEM_PROPERTIES_CHEST_RIG.capacity}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.class}
                </Grid>
              </>
            ) : null}
            {properties.zones ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.zones}
                </Grid>
                <Grid xs={6} md={3}>
                  <List disablePadding>
                    {properties.zones.map((zone) => (
                      <ListItem disableGutters disablePadding key={zone}>
                        {zone ? BODY_ZONES[zone] : null}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </>
            ) : null}
            {properties.durability ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.durability}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.durability}
                </Grid>
              </>
            ) : null}
            {properties.material?.id ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.material}
                </Grid>
                <Grid xs={6} md={3}>
                  {translateMaterialName(
                    properties.material.id,
                    ARMOR_MATERIAL
                  )}
                </Grid>
              </>
            ) : null}
            {properties.repairCost ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.repairCost}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.repairCost}
                </Grid>
              </>
            ) : null}
            {properties.ergoPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.ergoPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.ergoPenalty)}
                </Grid>
              </>
            ) : null}
            {properties.speedPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.speedPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.speedPenalty)}
                </Grid>
              </>
            ) : null}
            {properties.turnPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.turnPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.turnPenalty)}
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
