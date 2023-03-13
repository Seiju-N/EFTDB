import { useQuery } from "@apollo/client";
import type { LinearProgressProps } from "@mui/material/LinearProgress";
import { Box, LinearProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import type { ItemPropertiesAmmo, Scalars } from "@/graphql/generated";

import { convertPercent, CustomSkelton } from "../utils";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { normalise } from "@/utils";
import { GET_ITEM_PROPERTIES_AMMO } from "@/query";

type Props = {
  ItemId: Scalars["ID"];
};

type QueryType = {
  item: {
    properties: ItemPropertiesAmmo | null;
  };
};

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number; maxValue?: number }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={normalise(props.value, 0, props.maxValue)}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}`}</Typography>
      </Box>
    </Box>
  );
};

export const Ammo = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_AMMO } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_AMMO,
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
        <Box pb={2}>
          <Typography gutterBottom variant="subtitle1">
            {ITEM_PROPERTIES_AMMO.title}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: "100%", fontSize: "0.7rem" }}
          >
            {properties.damage ? (
              <>
                <Grid xs={3}>{ITEM_PROPERTIES_AMMO.damage}</Grid>
                <Grid xs={9}>
                  <LinearProgressWithLabel
                    value={normalise(properties.damage, 0, 200)}
                    maxValue={200}
                  />
                </Grid>
              </>
            ) : null}
            {properties.armorDamage ? (
              <>
                <Grid xs={3}>{ITEM_PROPERTIES_AMMO.armorDamage}</Grid>
                <Grid xs={9}>
                  <LinearProgressWithLabel value={properties.armorDamage} />
                </Grid>
              </>
            ) : null}
            {properties.penetrationPower ? (
              <>
                <Grid xs={3}>{ITEM_PROPERTIES_AMMO.penetrationPower}</Grid>
                <Grid xs={9}>
                  <LinearProgressWithLabel
                    value={properties.penetrationPower}
                  />
                </Grid>
              </>
            ) : null}
            {properties.initialSpeed ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.initialSpeed}
                </Grid>
                <Grid xs={6} md={3}>{`${properties.initialSpeed} m/sec`}</Grid>
              </>
            ) : null}
            {properties.penetrationPower ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.penetrationPower}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.penetrationPower}
                </Grid>
              </>
            ) : null}
            {properties.caliber ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.caliber}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.caliber}
                </Grid>
              </>
            ) : null}
            {properties.tracer ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.tracer}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.tracerColor}
                </Grid>
              </>
            ) : null}
            {properties.fragmentationChance ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.fragmentationChance}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.fragmentationChance)}
                </Grid>
              </>
            ) : null}
            {properties.ricochetChance ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.ricochetChance}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.ricochetChance)}
                </Grid>
              </>
            ) : null}
            {properties.penetrationChance ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.penetrationChance}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.penetrationChance)}
                </Grid>
              </>
            ) : null}
            {properties.accuracyModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.accuracyModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.accuracyModifier)}
                </Grid>
              </>
            ) : null}
            {properties.recoilModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.recoilModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.recoilModifier)}
                </Grid>
              </>
            ) : null}
            {properties.lightBleedModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.lightBleedModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.lightBleedModifier)}
                </Grid>
              </>
            ) : null}
            {properties.heavyBleedModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.heavyBleedModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.heavyBleedModifier)}
                </Grid>
              </>
            ) : null}
            {properties.durabilityBurnFactor ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.durabilityBurnFactor}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.durabilityBurnFactor}
                </Grid>
              </>
            ) : null}
            {properties.heatFactor ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.heatFactor}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.heatFactor}
                </Grid>
              </>
            ) : null}
          </Grid>
        </Box>
      ) : (
        <CustomSkelton />
      )}
    </>
  );
};
