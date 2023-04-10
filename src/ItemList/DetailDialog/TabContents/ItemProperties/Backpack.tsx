import { LanguageContext, LanguageDictContext } from "@/App";
import { ItemPropertiesBackpack } from "@/graphql/generated";
import { GET_ITEM_PROPERTIES_BACKPACK } from "@/query";
import { useQuery } from "@apollo/client";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { convertPercent, CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { Loading } from "./Loading";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesBackpack | null;
  };
};

export const Backpack = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_BACKPACK } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_BACKPACK(lang),
    {
      variables: {
        itemId: ItemId,
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
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {/* TODO: 構造(Gridの表示)  */}
            {properties.capacity ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_BACKPACK.capacity}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.capacity}
                </Grid>
              </>
            ) : null}
            {properties.ergoPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_BACKPACK.ergoPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {`${properties.ergoPenalty}%`}
                </Grid>
              </>
            ) : null}
            {properties.speedPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_BACKPACK.speedPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.speedPenalty)}
                </Grid>
              </>
            ) : null}
            {properties.turnPenalty ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_BACKPACK.turnPenalty}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.turnPenalty)}
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
