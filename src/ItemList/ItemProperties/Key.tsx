import React, { Fragment, useEffect, useState } from "react";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { ITEM_PROPERTIES_KEY } from "../../constants/LANG_VALUES";
import { CustomSkelton, fetchParams } from "../utils";

import { ItemPropertiesKey } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

const Key = ({ ItemId }: Props) => {
  const [itemPropertyData, setItemPropertyData] = useState<ItemPropertiesKey>();
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            item(id: "${ItemId}") {
              properties {
              ... on ItemPropertiesKey
                {
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
            {Object.keys(ITEM_PROPERTIES_KEY).map((key, idx) =>
              itemPropertyData![key as keyof typeof itemPropertyData] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_KEY[
                        key as keyof typeof ITEM_PROPERTIES_KEY
                      ]
                    }
                  </Grid>
                  <Grid xs={2}>
                    {`${
                      itemPropertyData![key as keyof typeof itemPropertyData]
                    }/${
                      itemPropertyData![key as keyof typeof itemPropertyData]
                    }`}
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

export default Key;
