import { gql, useQuery } from "@apollo/client";
import type { LinearProgressProps } from "@mui/material";
import { Box, LinearProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment } from "react";

import type { Scalars } from "@/graphql/generated";

import { ITEM_PROPERTIES_AMMO } from "../../constants/LANG_VALUES";
import { convertPercent, CustomSkelton } from "../utils";

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
  }
`;

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

  type detailGridType = {
    keyword: string;
  };

  const { loading, error, data } = useQuery(GET_ITEM_PROPERTIES_QUERY, {
    variables: {
      itemId: ItemId,
    },
  });

  if (loading || error) return null;

  const DetailInfoBarGrid = ({ keyword }: detailGridType) => {
    return (
      <>
        <Grid xs={3}>
          {ITEM_PROPERTIES_AMMO[keyword as keyof typeof ITEM_PROPERTIES_AMMO]}
        </Grid>
        <Grid xs={9}>
          <LinearProgressWithLabel
            value={
              data.item.properties[keyword as keyof typeof data.item.properties]
            }
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
              data.item.properties[keyword as keyof typeof data.item.properties]
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
            {data.item.properties[keyword as keyof typeof data.item.properties]}
          </Grid>
        </>
      );
    }
  };

  return (
    <>
      {!data.item.properties ? (
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
              data.item.properties[key as keyof typeof data.item.properties] &&
              (key === "damage" ||
                key === "armorDamage" ||
                key === "penetrationPower") ? (
                <Fragment key={idx}>
                  <DetailInfoBarGrid keyword={key} />
                </Fragment>
              ) : null
            )}
            {Object.keys(ITEM_PROPERTIES_AMMO).map((key, idx) =>
              data.item.properties[key as keyof typeof data.item.properties] &&
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
