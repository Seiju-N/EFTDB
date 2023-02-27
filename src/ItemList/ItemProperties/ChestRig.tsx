
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useEffect, useState } from "react";

import type { ItemPropertiesChestRig } from "@/graphql/generated";

import { ITEM_PROPERTIES_CHEST_RIG } from "../../constants/LANG_VALUES";
import { CustomSkelton, fetchParams, translateMaterialName } from "../utils";


type Props = {
  ItemId: string;
};

const ChestRig = ({ ItemId }: Props) => {
  const [itemPropertyData, setItemPropertyData] =
    useState<ItemPropertiesChestRig>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesChestRig
                {
                  capacity
                  class
                  durability
                  ergoPenalty
                  material{
                    name
                  }
                  repairCost
                  speedPenalty
                  turnPenalty
                  zones
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
    if (keyword === "material") {
      if (!itemPropertyData?.material) return null;
      return (
        <Grid xs={2}>
          {translateMaterialName(itemPropertyData.material.id!)}
        </Grid>
      );
    } else {
      return (
        <Grid xs={2}>
          {itemPropertyData![keyword as keyof typeof itemPropertyData]}
        </Grid>
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
            sx={{ maxHeight: 144, minHeight: 80, fontSize: "0.7rem" }}
          >
            {Object.keys(ITEM_PROPERTIES_CHEST_RIG).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_CHEST_RIG[
                        key as keyof typeof ITEM_PROPERTIES_CHEST_RIG
                      ]
                    }
                  </Grid>
                  <DetailGrid keyword={key} />
                </Fragment>
              ) : null
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default ChestRig;
