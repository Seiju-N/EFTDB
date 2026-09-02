import { LanguageContext, LanguageDictContext } from "@/App";
import { useItemProperties } from "@/api/hooks";
import { Box, List, ListItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { convertPercent, CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { Loading } from "./Loading";

type Props = {
  ItemId: string;
};

export const Scope = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_SCOPE } = useContext(LanguageDictContext);
  const { loading, error, data } = useItemProperties(ItemId, lang);

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
            {properties.ergonomics ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_SCOPE.ergonomics}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.ergonomics}
                </Grid>
              </>
            ) : null}
            {properties.recoilModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_SCOPE.recoilModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.recoilModifier)}
                </Grid>
              </>
            ) : null}
            {properties.sightingRange ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_SCOPE.sightingRange}
                </Grid>
                <Grid xs={6} md={3}>{`${properties.sightingRange} m`}</Grid>
              </>
            ) : null}
            {properties.sightModes?.length !== 0 ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_SCOPE.sightModes}
                </Grid>
                <Grid xs={6} md={3} display={"flex"}>
                  {properties.sightModes?.map((sightMode: number) => (
                    <Box pr={2} key={sightMode}>{`x${sightMode}`}</Box>
                  ))}
                </Grid>
              </>
            ) : null}
            {properties.zoomLevels?.length !== 0 ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_SCOPE.zoomLevels}
                </Grid>
                <Grid xs={6} md={3}>
                  <List disablePadding>
                    {properties.zoomLevels?.map((zoomLevels: number[], idx: number) => (
                      <ListItem
                        disableGutters
                        disablePadding
                        key={`${zoomLevels}_${idx}`}
                      >
                        {zoomLevels
                          ?.map((zoomLevel: number) => `x${zoomLevel}`)
                          .join(", ")}
                      </ListItem>
                    ))}
                  </List>
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
