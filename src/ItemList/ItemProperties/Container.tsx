
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useEffect, useState } from "react";

import type { ItemPropertiesContainer } from "@/graphql/generated";

import { ITEM_PROPERTIES_CONTAINER } from "../../constants/LANG_VALUES";
import { CustomSkelton, fetchParams } from "../utils";


type Props = {
  ItemId: string;
};

const Container = ({ ItemId }: Props) => {
  const [itemPropertyData, setItemPropertyData] =
    useState<ItemPropertiesContainer>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesContainer
                {
                  capacity
                  grid{
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
                    width
                    height
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
            {Object.keys(ITEM_PROPERTIES_CONTAINER).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_CONTAINER[
                        key as keyof typeof ITEM_PROPERTIES_CONTAINER
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

export default Container;
