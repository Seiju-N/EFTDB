import { List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useContext } from "react";

import { CustomSkelton, translateMaterialName } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesHelmet } from "@/graphql/generated";
import { LanguageDictContext } from "@/App";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesHelmet | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesHelmet {
          blindnessProtection
          blocksHeadset
          class
          deafening
          durability
          ergoPenalty
          headZones
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

const Helmet = ({ ItemId }: Props) => {
  const { ITEM_PROPERTIES_HELMET, ARMOR_MATERIAL } =
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
          <Grid container sx={{ minHeight: 80, fontSize: "0.7rem" }}>
            {properties.class ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.class}
                </Grid>
                <Grid xs={3}>{properties.class}</Grid>
              </>
            ) : null}
            {properties.blindnessProtection ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.blindnessProtection}
                </Grid>
                <Grid xs={3}>{properties.blindnessProtection}</Grid>
              </>
            ) : null}
            {properties.blocksHeadset ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.blocksHeadset}
                </Grid>
                <Grid xs={3}>{properties.blocksHeadset}</Grid>
              </>
            ) : null}
            {properties.deafening ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.deafening}
                </Grid>
                <Grid xs={3}>{properties.deafening}</Grid>
              </>
            ) : null}
            {properties.material?.id ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.material}
                </Grid>
                <Grid xs={3}>
                  {translateMaterialName(
                    properties.material.id,
                    ARMOR_MATERIAL
                  )}
                </Grid>
              </>
            ) : null}
            {properties.headZones ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_HELMET.headZones}
                </Grid>
                <Grid xs={3}>
                  <List disablePadding>
                    {properties.headZones.map((zone) => (
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

export default Helmet;
