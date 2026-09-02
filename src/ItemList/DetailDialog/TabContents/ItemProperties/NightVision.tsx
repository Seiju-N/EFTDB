import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { useItemProperties } from "@/api/hooks";

type Props = {
  ItemId: string;
};

export const NightVision = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_NIGHT_VISION } = useContext(LanguageDictContext);
  const { loading, error, data } = useItemProperties(ItemId, lang);

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
            {properties.diffuseIntensity ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_NIGHT_VISION.diffuseIntensity}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.diffuseIntensity}
                </Grid>
              </>
            ) : null}
            {properties.intensity ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_NIGHT_VISION.intensity}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.intensity}
                </Grid>
              </>
            ) : null}
            {properties.noiseIntensity ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_NIGHT_VISION.noiseIntensity}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.noiseIntensity}
                </Grid>
              </>
            ) : null}
            {properties.noiseScale ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_NIGHT_VISION.noiseScale}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.noiseScale}
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
