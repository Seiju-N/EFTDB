import { LanguageDictContext } from "@/App";
import { ItemPropertiesArmor } from "@/graphql/generated";
import { gql, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton, translateMaterialName } from "../utils";
import { Loading } from "./Loading";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesArmor | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
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
        }
      }
    }
  }
`;

const Armor = ({ ItemId }: Props) => {
  const { ITEM_PROPERTIES_ARMOR, ARMOR_MATERIAL } =
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
                  {ITEM_PROPERTIES_ARMOR.class}
                </Grid>
                <Grid xs={3}>{properties.class}</Grid>
              </>
            ) : null}
            {properties.durability ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.durability}
                </Grid>
                <Grid xs={3}>{properties.durability}</Grid>
              </>
            ) : null}
            {properties.material?.id ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.material}
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
                  {ITEM_PROPERTIES_ARMOR.repairCost}
                </Grid>
                <Grid xs={3}>{properties.repairCost}</Grid>
              </>
            ) : null}
            {properties.ergoPenalty ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.ergoPenalty}
                </Grid>
                <Grid xs={3}>{properties.ergoPenalty}</Grid>
              </>
            ) : null}
            {properties.speedPenalty ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.speedPenalty}
                </Grid>
                <Grid xs={3}>{properties.speedPenalty}</Grid>
              </>
            ) : null}
            {properties.turnPenalty ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_ARMOR.turnPenalty}
                </Grid>
                <Grid xs={3}>{properties.turnPenalty}</Grid>
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

export default Armor;
