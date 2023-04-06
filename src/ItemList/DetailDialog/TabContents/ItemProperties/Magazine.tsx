import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { convertPercent, CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesMagazine } from "@/graphql/generated";
import { LanguageContext, LanguageDictContext } from "@/App";
import { GET_ITEM_PROPERTIES_MAGAZINE } from "@/query";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesMagazine | null;
  };
};

export const Magazine = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_MAGAZINE } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_MAGAZINE,
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
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.capacity ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MAGAZINE.capacity}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.capacity}
                </Grid>
              </>
            ) : null}
            {properties.ergonomics ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MAGAZINE.ergonomics}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.ergonomics}
                </Grid>
              </>
            ) : null}
            {properties.ammoCheckModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MAGAZINE.ammoCheckModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.ammoCheckModifier)}
                </Grid>
              </>
            ) : null}
            {properties.loadModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MAGAZINE.loadModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.loadModifier)}
                </Grid>
              </>
            ) : null}
            {properties.recoilModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MAGAZINE.recoilModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.recoilModifier)}
                </Grid>
              </>
            ) : null}
            {properties.malfunctionChance ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MAGAZINE.malfunctionChance}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.malfunctionChance)}
                </Grid>
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
