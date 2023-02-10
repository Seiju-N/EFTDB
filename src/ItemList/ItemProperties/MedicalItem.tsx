import React, { Fragment, useEffect, useState } from "react";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { ITEM_PROPERTIES_MEDICAL_ITEM } from "../../constants/LANG_VALUES";
import { CustomSkelton, fetchParams } from "../utils";

import { ItemPropertiesMedicalItem } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

const MedicalItem = ({ ItemId }: Props) => {
  const [itemPropertyData, setItemPropertyData] =
    useState<ItemPropertiesMedicalItem>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesMedicalItem
                {
                  cures
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
            {Object.keys(ITEM_PROPERTIES_MEDICAL_ITEM).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_MEDICAL_ITEM[
                        key as keyof typeof ITEM_PROPERTIES_MEDICAL_ITEM
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

export default MedicalItem;
