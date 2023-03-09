import { LanguageDictContext } from "@/App";
import { ItemPropertiesBackpack } from "@/graphql/generated";
import { gql, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { convertPercent, CustomSkelton } from "../utils";
import { Loading } from "./Loading";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesBackpack | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesBackpack {
          capacity
          grids {
            filters {
              allowedCategories {
                name
              }
              allowedItems {
                name
              }
              excludedCategories {
                name
              }
              excludedItems {
                name
              }
            }
            height
            width
            ergoPenalty
            speedPenalty
            turnPenalty
          }
        }
      }
    }
  }
`;

const Backpack = ({ ItemId }: Props) => {
  const { ITEM_PROPERTIES_BACKPACK } = useContext(LanguageDictContext);
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
            {/* TODO: 構造(Gridの表示)  */}
            {properties.capacity ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_BACKPACK.capacity}
                </Grid>
                <Grid xs={3}>{properties.capacity}</Grid>
              </>
            ) : null}
            {properties.ergoPenalty ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_BACKPACK.ergoPenalty}
                </Grid>
                <Grid xs={3}>{convertPercent(properties.ergoPenalty)}</Grid>
              </>
            ) : null}
            {properties.speedPenalty ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_BACKPACK.speedPenalty}
                </Grid>
                <Grid xs={3}>{convertPercent(properties.speedPenalty)}</Grid>
              </>
            ) : null}
            {properties.turnPenalty ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_BACKPACK.turnPenalty}
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

export default Backpack;
