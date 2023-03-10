import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { ItemPropertiesPreset } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesPreset | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
      properties {
        ... on ItemPropertiesPreset {
          ergonomics
          moa
          recoilHorizontal
          recoilVertical
        }
      }
    }
  }
`;

export const Preset = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_PRESET } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_QUERY,
    {
      variables: {
        itemId: ItemId,
        lang,
      },
    }
  );

  if (loading) return <Loading />;
  if (!data || error) return null;
  const properties = data.item.properties;

  return (
    <>
      {properties ? (
        <>
          <Typography gutterBottom variant="subtitle1">
            {ITEM_PROPERTIES_PRESET.title}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.ergonomics ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_PRESET.ergonomics}
                </Grid>
                <Grid xs={3}>{properties.ergonomics}</Grid>
              </>
            ) : null}
            {properties.moa ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_PRESET.moa}
                </Grid>
                <Grid xs={3}>{properties.moa}</Grid>
              </>
            ) : null}
            {properties.recoilHorizontal ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_PRESET.recoilHorizontal}
                </Grid>
                <Grid xs={3}>{properties.recoilHorizontal}</Grid>
              </>
            ) : null}
            {properties.recoilVertical ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_PRESET.recoilVertical}
                </Grid>
                <Grid xs={3}>{properties.recoilVertical}</Grid>
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
