import { LanguageContext, LanguageDictContext } from "@/App";
import { ItemPropertiesArmor } from "@/graphql/generated";
import { GET_ITEM_PROPERTIES_ARMOR } from "@/query";
import { useQuery } from "@apollo/client";
import { List, ListItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { Loading } from "./Loading";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesArmor | null;
  };
};

export const Armor = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_ARMOR } = useContext(LanguageDictContext);
  const QUERY = GET_ITEM_PROPERTIES_ARMOR(lang);
  const { loading, error, data } = useQuery<QueryType>(QUERY, {
    variables: {
      itemId: ItemId,
      lang,
    },
  });
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
                  {ITEM_PROPERTIES_ARMOR.class}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.class}
                </Grid>
              </>
            ) : null}
            {properties.zones ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.zones}
                </Grid>
                <Grid xs={6} md={3}>
                  <List disablePadding>
                    {properties.zones.map((zone) => (
                      <ListItem disableGutters disablePadding key={zone}>
                        {zone ? zone : null}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </>
            ) : null}
            {properties.durability ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.durability}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.durability}
                </Grid>
              </>
            ) : null}
            {properties.material?.id ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.material}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.material.name}
                </Grid>
              </>
            ) : null}
            {properties.repairCost ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.repairCost}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.repairCost}
                </Grid>
              </>
            ) : null}
            {properties.ergoPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.ergoPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.ergoPenalty}
                </Grid>
              </>
            ) : null}
            {properties.speedPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.speedPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.speedPenalty}
                </Grid>
              </>
            ) : null}
            {properties.turnPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.turnPenalty}
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
