import { List, ListItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { ItemPropertiesPainkiller } from "@/graphql/generated";
import { GET_ITEM_PROPERTIES_PAINKILLER } from "@/query";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesPainkiller | null;
  };
};

export const Painkiller = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_PAINKILLER } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_PAINKILLER,
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
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.cures ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_PAINKILLER.cures}
                </Grid>
                <Grid xs={6} md={3}>
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
            {properties.energyImpact ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_PAINKILLER.energyImpact}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.energyImpact}
                </Grid>
              </>
            ) : null}
            {properties.hydrationImpact ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_PAINKILLER.hydrationImpact}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.hydrationImpact}
                </Grid>
              </>
            ) : null}
            {properties.painkillerDuration ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_PAINKILLER.painkillerDuration}
                </Grid>
                <Grid
                  xs={6}
                  md={3}
                >{`${properties.painkillerDuration} sec`}</Grid>
              </>
            ) : null}
            {properties.useTime ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_PAINKILLER.useTime}
                </Grid>
                <Grid xs={6} md={3}>{`${properties.useTime} sec`}</Grid>
              </>
            ) : null}
            {properties.uses ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_PAINKILLER.uses}
                </Grid>
                <Grid
                  xs={6}
                  md={3}
                >{`${properties.uses}/${properties.uses}`}</Grid>
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
