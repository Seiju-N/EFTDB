import React, { Fragment, useEffect, useState } from "react";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { ITEM_PROPERTIES_ARMOR_ATTACHMENT } from "../../constants/LANG_VALUES";
import { CustomSkelton, fetchParams, translateMaterialName } from "../utils";

import { ItemPropertiesArmorAttachment } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

const ArmorAttachment = ({ ItemId }: Props) => {
  const [itemPropertyData, setItemPropertyData] =
    useState<ItemPropertiesArmorAttachment>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesArmorAttachment
                {
                  blindnessProtection
                  class
                  durability
                  ergoPenalty
                  headZones
                  material{
                    name
                  }
                  repairCost
                  speedPenalty
                  turnPenalty
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
            {Object.keys(ITEM_PROPERTIES_ARMOR_ATTACHMENT).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_ARMOR_ATTACHMENT[
                        key as keyof typeof ITEM_PROPERTIES_ARMOR_ATTACHMENT
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

export default ArmorAttachment;
