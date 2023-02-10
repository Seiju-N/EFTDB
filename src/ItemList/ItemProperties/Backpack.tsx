import React, { useEffect, useState, Fragment } from "react";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { ITEM_PROPERTIES_BACKPACK } from "../../constants/LANG_VALUES";
import { CustomSkelton, fetchParams } from "../utils";

import { ItemPropertiesBackpack } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

const Backpack = ({ ItemId }: Props) => {
  const [itemPropertyData, setItemPropertyData] =
    useState<ItemPropertiesBackpack>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesBackpack
                {
                  capacity
                  grids{
                    filters{
                      allowedCategories{
                        name
                      }
                      allowedItems{
                        name
                      }
                      excludedCategories{
                        name
                      }
                      excludedItems{
                        name
                      }
                    }
                    height
                    width
                  }
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
            {/* TODO: 構造(Gridの表示)  */}
            {Object.keys(ITEM_PROPERTIES_BACKPACK).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_BACKPACK[
                        key as keyof typeof ITEM_PROPERTIES_BACKPACK
                      ]
                    }
                  </Grid>
                  <Grid xs={2}>
                    <>
                      {itemPropertyData![key as keyof typeof itemPropertyData]}
                    </>
                  </Grid>
                </Fragment>
              ) : null
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Backpack;
