import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesWeapon } from "@/graphql/generated";
import { LanguageContext, LanguageDictContext } from "@/App";
import { GET_ITEM_PROPERTIES_WEAPON } from "@/query";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesWeapon | null;
  };
};

export const Weapon = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_WEAPON } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_WEAPON,
    {
      variables: {
        itemId: ItemId,
        lang,
      },
    }
  );

  if (!data || loading) return <Loading />;
  if (error) return null;
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
            {properties.caliber ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.caliber}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.caliber}
                </Grid>
              </>
            ) : null}
            {properties.centerOfImpact ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.centerOfImpact}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.centerOfImpact}
                </Grid>
              </>
            ) : null}
            {properties.effectiveDistance ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.effectiveDistance}
                </Grid>
                <Grid xs={6} md={3}>{`${properties.effectiveDistance} m`}</Grid>
              </>
            ) : null}
            {properties.ergonomics ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.ergonomics}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.ergonomics}
                </Grid>
              </>
            ) : null}
            {properties.fireModes ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.fireModes}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.fireModes.join(", ")}
                </Grid>
              </>
            ) : null}
            {properties.fireRate ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.fireRate}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.fireRate}
                </Grid>
              </>
            ) : null}
            {properties.fireRate ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.fireRate}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.fireRate}
                </Grid>
              </>
            ) : null}
            {properties.recoilHorizontal ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.recoilHorizontal}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.recoilHorizontal}
                </Grid>
              </>
            ) : null}
            {properties.recoilVertical ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.recoilVertical}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.recoilVertical}
                </Grid>
              </>
            ) : null}
            {properties.sightingRange ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON.sightingRange}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.sightingRange}
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
