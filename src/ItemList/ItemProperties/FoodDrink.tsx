import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment } from "react";

import { ITEM_PROPERTIES_FOOD_DRINK } from "../../constants/LANG_VALUES";
import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";

type Props = {
  ItemId: string;
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesFoodDrink {
          energy
          hydration
          stimEffects {
            chance
            delay
            duration
            percent
            skillName
            type
            value
          }
          units
        }
      }
    }
  }
`;

const FoodDrink = ({ ItemId }: Props) => {
  const { loading, error, data } = useQuery(GET_ITEM_PROPERTIES_QUERY, {
    variables: {
      itemId: ItemId,
    },
  });

  if (error) return null;
  if (loading) return <Loading />;
  return (
    <>
      {!data.item.properties ? (
        <CustomSkelton />
      ) : (
        <>
          <Typography gutterBottom variant="subtitle1">
            詳細
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {Object.keys(ITEM_PROPERTIES_FOOD_DRINK).map((key, idx) =>
              data.item.properties[key as keyof typeof data.item.properties] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_FOOD_DRINK[
                        key as keyof typeof ITEM_PROPERTIES_FOOD_DRINK
                      ]
                    }
                  </Grid>
                  <Grid xs={2}>
                    <>
                      {
                        data.item.properties[
                          key as keyof typeof data.item.properties
                        ]
                      }
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

export default FoodDrink;
