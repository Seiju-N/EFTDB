import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { ItemPropertiesGrenade } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesGrenade | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
      properties {
        ... on ItemPropertiesGrenade {
          contusionRadius
          fragments
          fuse
          maxExplosionDistance
          minExplosionDistance
          type
        }
      }
    }
  }
`;

export const Grenade = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_GRENADE } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_QUERY,
    {
      variables: {
        itemId: ItemId,
        lang,
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
            {ITEM_PROPERTIES_GRENADE.title}
          </Typography>
          <Grid container sx={{ minHeight: 80, fontSize: "0.7rem" }}>
            {properties.type ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.type}
                </Grid>
                <Grid xs={3}>{properties.type}</Grid>
              </>
            ) : null}
            {properties.contusionRadius ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.contusionRadius}
                </Grid>
                <Grid xs={3}>{properties.contusionRadius}</Grid>
              </>
            ) : null}
            {properties.fragments ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.fragments}
                </Grid>
                <Grid xs={3}>{properties.fragments}</Grid>
              </>
            ) : null}
            {properties.fuse ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.fuse}
                </Grid>
                <Grid xs={3}>{properties.fuse}</Grid>
              </>
            ) : null}
            {properties.minExplosionDistance ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.minExplosionDistance}
                </Grid>
                <Grid xs={3}>{properties.minExplosionDistance}</Grid>
              </>
            ) : null}
            {properties.maxExplosionDistance ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.maxExplosionDistance}
                </Grid>
                <Grid xs={3}>{properties.maxExplosionDistance}</Grid>
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
