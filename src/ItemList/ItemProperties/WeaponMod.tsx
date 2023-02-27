
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";

import type { ItemPropertiesWeapon } from "@/graphql/generated";

import { ITEM_PROPERTIES_WEAPON_MOD } from "../../constants/LANG_VALUES";
import { convertPercent, CustomSkelton, fetchParams } from "../utils";


type Props = {
  ItemId: string;
};

const WeaponMod = ({ ItemId }: Props) => {
  const [itemPropertyData, setItemPropertyData] =
    useState<ItemPropertiesWeapon>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesWeaponMod
                {
                  accuracyModifier
                  ergonomics
                  recoilModifier
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

  const DetailGrid = ({ keyword }: detailGridType) => {
    return (
      <Grid xs={2}>
        {keyword.includes("Modifier")
          ? convertPercent(
              itemPropertyData![keyword as keyof typeof itemPropertyData]
            )
          : itemPropertyData![keyword as keyof typeof itemPropertyData] || "-"}
      </Grid>
    );
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
            sx={{ maxHeight: 144, minHeight: 80, fontSize: "0.7rem" }}
          >
            {Object.keys(ITEM_PROPERTIES_WEAPON_MOD).map((key) =>
              itemPropertyData![key as keyof typeof itemPropertyData] ? (
                <>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_WEAPON_MOD[
                        key as keyof typeof ITEM_PROPERTIES_WEAPON_MOD
                      ]
                    }
                  </Grid>
                  <DetailGrid keyword={key} />
                </>
              ) : null
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default WeaponMod;
