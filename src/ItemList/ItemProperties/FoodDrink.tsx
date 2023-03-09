import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesFoodDrink } from "@/graphql/generated";
import { LanguageDictContext } from "@/App";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesFoodDrink | null;
  };
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
  const { ITEM_PROPERTIES_FOOD_DRINK } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_QUERY,
    {
      variables: {
        itemId: ItemId,
      },
    }
  );

  if (!data || loading) return <Loading />;
  if (error) return null;
  const properties = data.item.properties;

  return (
    <>
      {properties ? (
        <>
          <Typography gutterBottom variant="subtitle1">
            詳細
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.energy ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_FOOD_DRINK.energy}
                </Grid>
                <Grid xs={3}>{properties.energy}</Grid>
              </>
            ) : null}
            {properties.hydration ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_FOOD_DRINK.hydration}
                </Grid>
                <Grid xs={3}>{properties.hydration}</Grid>
              </>
            ) : null}
            {properties.stimEffects ? (
              <>
                <Typography>StimEffects</Typography>
                {properties.stimEffects.map((effect) => (
                  <>
                    <Grid xs={3} color="text.secondary">
                      {ITEM_PROPERTIES_FOOD_DRINK.skillName}
                    </Grid>
                    <Grid
                      xs={3}
                    >{`${effect?.chance}%  ${effect?.duration}sec`}</Grid>
                    s
                  </>
                ))}
              </>
            ) : null}
          </Grid>
        </>
      ) : (
        <CustomSkelton />
      )}
    </>
  );
};

export default FoodDrink;
