import React, { Fragment, useEffect, useState } from "react";

import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { ITEM_PROPERTIES_AMMO } from "../../constants/LANG_VALUES";
import { convertPercent, CustomSkelton, fetchParams } from "../utils";

import { ItemPropertiesAmmo } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

const Ammo = ({ ItemId }: Props) => {
  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number }
  ) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}`}</Typography>
        </Box>
      </Box>
    );
  };
  const [itemPropertyData, setItemPropertyData] =
    useState<ItemPropertiesAmmo>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesAmmo 
                {
                  damage
                  armorDamage
                  penetrationPower
                  caliber
                  stackMaxSize
                  tracer
                  tracerColor
                  ammoType
                  projectileCount
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
          }`,
        }),
      })
        .then((r) => r.json())
        .then(({ data }) => {
          setItemPropertyData(data.item.properties);
        });
    };
    access_api();
  }, [ItemId]);

  type detailGridType = {
    keyword: string;
  };

  const DetailInfoBarGrid = ({ keyword }: detailGridType) => {
    return (
      <>
        <Grid xs={3}>
          {ITEM_PROPERTIES_AMMO[keyword as keyof typeof ITEM_PROPERTIES_AMMO]}
        </Grid>
        <Grid xs={9}>
          <LinearProgressWithLabel
            value={itemPropertyData![keyword as keyof typeof itemPropertyData]}
          />
        </Grid>
      </>
    );
  };
  const DetailInfoGrid = ({ keyword }: detailGridType) => {
    if (keyword.includes("Modifier")) {
      return (
        <>
          <Grid xs={4} color="text.secondary">
            {ITEM_PROPERTIES_AMMO[keyword as keyof typeof ITEM_PROPERTIES_AMMO]}
          </Grid>
          <Grid xs={2}>
            {convertPercent(
              itemPropertyData![keyword as keyof typeof itemPropertyData]
            )}
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid xs={4} color="text.secondary">
            {ITEM_PROPERTIES_AMMO[keyword as keyof typeof ITEM_PROPERTIES_AMMO]}
          </Grid>
          <Grid xs={2}>
            {itemPropertyData![keyword as keyof typeof itemPropertyData]}
          </Grid>
        </>
      );
    }
  };

  return (
    <>
      {!itemPropertyData ? (
        <CustomSkelton />
      ) : (
        <>
          <Typography gutterBottom variant="subtitle1">
            詳細
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ height: 144, minHeight: "100%", fontSize: "0.7rem" }}
          >
            {Object.keys(ITEM_PROPERTIES_AMMO).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] &&
              (key === "damage" ||
                key === "armorDamage" ||
                key === "penetrationPower") ? (
                <Fragment key={idx}>
                  <DetailInfoBarGrid keyword={key} />
                </Fragment>
              ) : null
            )}
            {Object.keys(ITEM_PROPERTIES_AMMO).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] &&
              !(
                key === "damage" ||
                key === "armorDamage" ||
                key === "penetrationPower"
              ) ? (
                <Fragment key={idx}>
                  <DetailInfoGrid keyword={key} />
                </Fragment>
              ) : null
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Ammo;
