
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useEffect, useState } from "react";

import type { ItemPropertiesSurgicalKit } from "@/graphql/generated";

import { ITEM_PROPERTIES_SURGICAL_KIT } from "../../constants/LANG_VALUES";
import { CustomSkelton, fetchParams } from "../utils";


type Props = {
  ItemId: string;
};

const SurgicalKit = ({ ItemId }: Props) => {
  const [itemPropertyData, setItemPropertyData] =
    useState<ItemPropertiesSurgicalKit>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesSurgicalKit
                {
                  cures
                  maxLimbHealth
                  minLimbHealth
                  useTime
                  uses
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
    if (keyword.includes("uses")) {
      return (
        <Grid xs={2}>
          {`${itemPropertyData![keyword as keyof typeof itemPropertyData]}/${
            itemPropertyData![keyword as keyof typeof itemPropertyData]
          }`}
        </Grid>
      );
    } else if (keyword.includes("useTime")) {
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
            {Object.keys(ITEM_PROPERTIES_SURGICAL_KIT).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_SURGICAL_KIT[
                        key as keyof typeof ITEM_PROPERTIES_SURGICAL_KIT
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

export default SurgicalKit;
