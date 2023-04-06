import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { ItemPropertiesGrenade } from "@/graphql/generated";
import { GET_ITEM_PROPERTIES_GRENADE } from "@/query";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesGrenade | null;
  };
};

export const Grenade = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_GRENADE } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_GRENADE,
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
          <Grid container sx={{ minHeight: 80, fontSize: "0.7rem" }}>
            {properties.type ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.type}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.type}
                </Grid>
              </>
            ) : null}
            {properties.contusionRadius ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.contusionRadius}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.contusionRadius}
                </Grid>
              </>
            ) : null}
            {properties.fragments ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.fragments}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.fragments}
                </Grid>
              </>
            ) : null}
            {properties.fuse ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.fuse}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.fuse}
                </Grid>
              </>
            ) : null}
            {properties.minExplosionDistance ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.minExplosionDistance}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.minExplosionDistance}
                </Grid>
              </>
            ) : null}
            {properties.maxExplosionDistance ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_GRENADE.maxExplosionDistance}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.maxExplosionDistance}
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
