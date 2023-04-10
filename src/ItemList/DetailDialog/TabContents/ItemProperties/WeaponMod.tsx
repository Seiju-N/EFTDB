import Grid from "@mui/material/Unstable_Grid2";

import { convertPercent, CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { useContext } from "react";
import { ItemPropertiesWeaponMod } from "@/graphql/generated";
import { GET_ITEM_PROPERTIES_WEAPON_MOD } from "@/query";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesWeaponMod | null;
  };
};

export const WeaponMod = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_WEAPON_MOD } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_WEAPON_MOD(lang),
    {
      variables: {
        itemId: ItemId,
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
            {properties.ergonomics ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON_MOD.ergonomics}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.ergonomics}
                </Grid>
              </>
            ) : null}
            {properties.accuracyModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON_MOD.accuracyModifier}
                </Grid>
                <Grid xs={6} md={3}>
                  {convertPercent(properties.accuracyModifier)}
                </Grid>
              </>
            ) : null}
            {properties.recoilModifier ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON_MOD.recoilModifier}
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
