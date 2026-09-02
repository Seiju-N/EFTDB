import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { convertPercent, CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { useItemProperties } from "@/api/hooks";

type Props = {
  ItemId: string;
};

export const Barrel = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_BARREL } = useContext(LanguageDictContext);
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
            {properties.centerOfImpact ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.centerOfImpact}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.centerOfImpact}
                </Grid>
              </>
            ) : null}
            {properties.deviationCurve ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.deviationCurve}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.deviationCurve}
                </Grid>
              </>
            ) : null}
            {properties.deviationMax ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.deviationMax}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.deviationMax}
                </Grid>
              </>
            ) : null}
            {properties.ergonomics ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.ergonomics}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.ergonomics}
                </Grid>
              </>
            ) : null}
            {properties.recoilModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.recoilModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.recoilModifier)}
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
