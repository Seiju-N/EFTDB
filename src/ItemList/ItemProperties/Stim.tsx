import React, { Fragment, useEffect, useState } from "react";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { ITEM_PROPERTIES_STIM } from "../../constants/LANG_VALUES";
import { CustomSkelton, fetchParams } from "../utils";

import { ItemPropertiesStim } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

const Stim = ({ ItemId }: Props) => {
  const [itemPropertyData, setItemPropertyData] =
    useState<ItemPropertiesStim>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesStim
                {
                  cures
                  stimEffects{
                    skillName
                  }
                  useTime
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
    if (keyword.includes("useTime")) {
      return (
        <Grid xs={2}>
          {`${itemPropertyData![keyword as keyof typeof itemPropertyData]}sec`}
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
            {Object.keys(ITEM_PROPERTIES_STIM).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_STIM[
                        key as keyof typeof ITEM_PROPERTIES_STIM
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

export default Stim;
