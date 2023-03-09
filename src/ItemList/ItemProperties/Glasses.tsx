import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton, translateMaterialName } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { LanguageDictContext } from "@/App";
import { ItemPropertiesGlasses } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesGlasses | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesGlasses {
          blindnessProtection
          class
          durability
          material {
            name
          }
          repairCost
        }
      }
    }
  }
`;

const Glasses = ({ ItemId }: Props) => {
  const { ITEM_PROPERTIES_GLASSES, ARMOR_MATERIAL } =
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
                  {ITEM_PROPERTIES_GLASSES.class}
                </Grid>
                <Grid xs={3}>{properties.class}</Grid>
              </>
            ) : null}
            {properties.durability ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_GLASSES.durability}
                </Grid>
                <Grid xs={3}>{properties.durability}</Grid>
              </>
            ) : null}
            {properties.blindnessProtection ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_GLASSES.blindnessProtection}
                </Grid>
                <Grid xs={3}>{properties.blindnessProtection}</Grid>
              </>
            ) : null}
            {properties.material?.id ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_GLASSES.material}
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
                  {ITEM_PROPERTIES_GLASSES.repairCost}
                </Grid>
                <Grid xs={3}>{properties.repairCost}</Grid>
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

export default Glasses;
