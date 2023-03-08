import { gql, useQuery } from "@apollo/client";
import type { LinearProgressProps } from "@mui/material/LinearProgress";
import { Box, LinearProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import type { ItemPropertiesAmmo, Scalars } from "@/graphql/generated";

import { convertPercent, CustomSkelton } from "../utils";
import { Loading } from "./Loading";
import { LanguageDictContext } from "@/App";
import { normalise } from "@/utils";

type Props = {
  ItemId: Scalars["ID"];
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesAmmo {
          damage
          armorDamage
          penetrationPower
          caliber
          stackMaxSize
          tracer
          tracerColor
          fragmentationChance
          ricochetChance
          penetrationChance
          accuracyModifier
          recoilModifier
          initialSpeed
          lightBleedModifier
          heavyBleedModifier
          durabilityBurnFactor
          heatFactor
        }
      }
    }
  }
`;

const Ammo = ({ ItemId }: Props) => {
  const { ITEM_PROPERTIES_AMMO } = useContext(LanguageDictContext);
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
  type QueryType = {
    item: {
      properties: ItemPropertiesAmmo | null;
    };
  };
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
      {!properties ? (
        <CustomSkelton />
      ) : (
        <Box pb={2}>
          <Typography gutterBottom variant="subtitle1">
            詳細
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
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.initialSpeed}
                </Grid>
                <Grid xs={3}>{`${properties.initialSpeed} m/sec`}</Grid>
              </>
            ) : null}
            {properties.penetrationPower ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.penetrationPower}
                </Grid>
                <Grid xs={3}>{properties.penetrationPower}</Grid>
              </>
            ) : null}
            {properties.caliber ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.caliber}
                </Grid>
                <Grid xs={3}>{properties.caliber}</Grid>
              </>
            ) : null}
            {properties.tracer ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.tracer}
                </Grid>
                <Grid xs={3}>{properties.tracerColor}</Grid>
              </>
            ) : null}
            {properties.fragmentationChance ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.fragmentationChance}
                </Grid>
                <Grid xs={3}>
                  {convertPercent(properties.fragmentationChance)}
                </Grid>
              </>
            ) : null}
            {properties.ricochetChance ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.ricochetChance}
                </Grid>
                <Grid xs={3}>{convertPercent(properties.ricochetChance)}</Grid>
              </>
            ) : null}
            {properties.penetrationChance ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.penetrationChance}
                </Grid>
                <Grid xs={3}>
                  {convertPercent(properties.penetrationChance)}
                </Grid>
              </>
            ) : null}
            {properties.accuracyModifier ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.accuracyModifier}
                </Grid>
                <Grid xs={3}>
                  {convertPercent(properties.accuracyModifier)}
                </Grid>
              </>
            ) : null}
            {properties.recoilModifier ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.recoilModifier}
                </Grid>
                <Grid xs={3}>{convertPercent(properties.recoilModifier)}</Grid>
              </>
            ) : null}
            {properties.lightBleedModifier ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.lightBleedModifier}
                </Grid>
                <Grid xs={3}>
                  {convertPercent(properties.lightBleedModifier)}
                </Grid>
              </>
            ) : null}
            {properties.heavyBleedModifier ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.heavyBleedModifier}
                </Grid>
                <Grid xs={3}>
                  {convertPercent(properties.heavyBleedModifier)}
                </Grid>
              </>
            ) : null}
            {properties.durabilityBurnFactor ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.durabilityBurnFactor}
                </Grid>
                <Grid xs={3}>{properties.durabilityBurnFactor}</Grid>
              </>
            ) : null}
            {properties.heatFactor ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_AMMO.heatFactor}
                </Grid>
                <Grid xs={3}>{properties.heatFactor}</Grid>
              </>
            ) : null}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Ammo;
