import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { useItemProperties } from "@/api/hooks";

type Props = {
  ItemId: string;
};

export const Melee = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_MELEE } = useContext(LanguageDictContext);
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
            {properties.hitRadius ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MELEE.hitRadius}
                </Grid>
                <Grid xs={6} md={3}>{`${properties.hitRadius} m`}</Grid>
              </>
            ) : null}
            {properties.slashDamage ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MELEE.slashDamage}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.slashDamage}
                </Grid>
              </>
            ) : null}
            {properties.stabDamage ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MELEE.stabDamage}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.stabDamage}
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
