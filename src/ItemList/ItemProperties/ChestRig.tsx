import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { convertPercent, CustomSkelton, translateMaterialName } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesChestRig } from "@/graphql/generated";
import { LanguageDictContext } from "@/App";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesChestRig | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
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

const ChestRig = ({ ItemId }: Props) => {
  const { ITEM_PROPERTIES_CHEST_RIG, ARMOR_MATERIAL } =
    useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_QUERY,
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
          <Typography gutterBottom variant="subtitle1">
            詳細
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.class ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.capacity}
                </Grid>
                <Grid xs={3}>{properties.class}</Grid>
              </>
            ) : null}
            {properties.durability ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.durability}
                </Grid>
                <Grid xs={3}>{properties.durability}</Grid>
              </>
            ) : null}
            {properties.material?.id ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.material}
                </Grid>
                <Grid xs={3}>
                  {translateMaterialName(
                    properties.material.id,
                    ARMOR_MATERIAL
                  )}
                </Grid>
              </>
            ) : null}
            {properties.repairCost ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.repairCost}
                </Grid>
                <Grid xs={3}>{properties.repairCost}</Grid>
              </>
            ) : null}
            {properties.ergoPenalty ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.ergoPenalty}
                </Grid>
                <Grid xs={3}>{convertPercent(properties.ergoPenalty)}</Grid>
              </>
            ) : null}
            {properties.speedPenalty ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.speedPenalty}
                </Grid>
                <Grid xs={3}>{convertPercent(properties.speedPenalty)}</Grid>
              </>
            ) : null}
            {properties.turnPenalty ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_CHEST_RIG.turnPenalty}
                </Grid>
                <Grid xs={3}>{convertPercent(properties.turnPenalty)}</Grid>
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

export default ChestRig;
