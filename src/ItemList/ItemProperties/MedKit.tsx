import { List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesMedKit } from "@/graphql/generated";
import { LanguageContext, LanguageDictContext } from "@/App";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesMedKit | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
      properties {
        ... on ItemPropertiesMedKit {
          cures
          hitpoints
          hpCostHeavyBleeding
          hpCostLightBleeding
          maxHealPerUse
          useTime
        }
      }
    }
  }
`;

export const MedKit = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_MEDKIT } = useContext(LanguageDictContext);
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
            {ITEM_PROPERTIES_MEDKIT.title}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.cures ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_MEDKIT.cures}
                </Grid>
                <Grid xs={3}>
                  <List disablePadding>
                    {properties.cures.map((cure) => (
                      <ListItem disablePadding disableGutters key={cure}>
                        {cure}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </>
            ) : null}
            {properties.hitpoints ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_MEDKIT.hitpoints}
                </Grid>
                <Grid xs={3}>{properties.hitpoints}</Grid>
              </>
            ) : null}
            {properties.hpCostLightBleeding ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_MEDKIT.hpCostLightBleeding}
                </Grid>
                <Grid xs={3}>{properties.hpCostLightBleeding}</Grid>
              </>
            ) : null}
            {properties.hpCostHeavyBleeding ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_MEDKIT.hpCostHeavyBleeding}
                </Grid>
                <Grid xs={3}>{properties.hpCostHeavyBleeding}</Grid>
              </>
            ) : null}
            {properties.maxHealPerUse ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_MEDKIT.maxHealPerUse}
                </Grid>
                <Grid xs={3}>{properties.maxHealPerUse}</Grid>
              </>
            ) : null}
            {properties.useTime ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_MEDKIT.useTime}
                </Grid>
                <Grid xs={3}>{`${properties.useTime} sec`}</Grid>
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
