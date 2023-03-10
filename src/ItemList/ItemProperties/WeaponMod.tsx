import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { convertPercent, CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { LanguageContext, LanguageDictContext } from "@/App";
import { useContext } from "react";
import { ItemPropertiesWeaponMod } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesWeaponMod | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID, $lang: LanguageCode) {
    item(id: $itemId, lang: $lang) {
      properties {
        ... on ItemPropertiesWeaponMod {
          accuracyModifier
          ergonomics
          recoilModifier
        }
      }
    }
  }
`;

export const WeaponMod = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_WEAPON_MOD } = useContext(LanguageDictContext);
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
            {ITEM_PROPERTIES_WEAPON_MOD.title}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.ergonomics ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON_MOD.ergonomics}
                </Grid>
                <Grid xs={3}>{properties.ergonomics}</Grid>
              </>
            ) : null}
            {properties.accuracyModifier ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON_MOD.accuracyModifier}
                </Grid>
                <Grid xs={3}>
                  {convertPercent(properties.accuracyModifier)}
                </Grid>
              </>
            ) : null}
            {properties.recoilModifier ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_WEAPON_MOD.recoilModifier}
                </Grid>
                <Grid xs={3}>{convertPercent(properties.recoilModifier)}</Grid>
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
