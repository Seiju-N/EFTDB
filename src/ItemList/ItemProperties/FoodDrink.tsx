import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useContext } from "react";

import { convertPercent, CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesFoodDrink } from "@/graphql/generated";
import { LanguageContext, LanguageDictContext } from "@/App";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesFoodDrink | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
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

export const FoodDrink = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_FOOD_DRINK } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_QUERY,
    {
      variables: {
        itemId: ItemId,
        lang,
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
            {ITEM_PROPERTIES_FOOD_DRINK.title}
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
            {properties.stimEffects.length !== 0 ? (
              <>
                <Grid xs={12}>
                  <Typography>
                    {ITEM_PROPERTIES_FOOD_DRINK.stimEffects}
                  </Typography>
                </Grid>
                {properties.stimEffects.map((effect) => (
                  <Fragment key={effect?.skillName}>
                    <Grid xs={3} color="text.secondary">
                      {effect?.skillName ? effect?.skillName : effect?.type}
                    </Grid>
                    <Grid xs={3}>{`${convertPercent(effect?.chance)}  ${
                      effect?.duration
                    }sec`}</Grid>
                  </Fragment>
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
