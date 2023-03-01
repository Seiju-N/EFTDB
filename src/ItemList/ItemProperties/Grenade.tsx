import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment } from "react";

import { ITEM_PROPERTIES_GRENADE } from "../../constants/LANG_VALUES";
import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";

type Props = {
  ItemId: string;
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesGrenade {
          contusionRadius
          fragments
          fuse
          maxExplosionDistance
          minExplosionDistance
          type
        }
      }
    }
  }
`;

const Grenade = ({ ItemId }: Props) => {
  const { loading, error, data } = useQuery(GET_ITEM_PROPERTIES_QUERY, {
    variables: {
      itemId: ItemId,
    },
  });

  if (loading || error || !data) return null;
  return (
    <>
      {!data.item?.properties ? (
        <CustomSkelton />
      ) : (
        <>
          <Typography gutterBottom variant="subtitle1">
            詳細
          </Typography>
          <Grid container sx={{ minHeight: 80, fontSize: "0.7rem" }}>
            {Object.keys(ITEM_PROPERTIES_GRENADE).map((key, idx) =>
              data.item?.properties[
                key as keyof typeof data.item.properties
              ] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_GRENADE[
                        key as keyof typeof ITEM_PROPERTIES_GRENADE
                      ]
                    }
                  </Grid>
                  <Grid xs={2}>
                    {
                      data.item.properties[
                        key as keyof typeof data.item.properties
                      ]
                    }
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

export default Grenade;
