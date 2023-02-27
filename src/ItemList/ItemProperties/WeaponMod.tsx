import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { ITEM_PROPERTIES_WEAPON_MOD } from "../../constants/LANG_VALUES";
import { convertPercent, CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";

type Props = {
  ItemId: string;
};
const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
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

const WeaponMod = ({ ItemId }: Props) => {
  const { loading, error, data } = useQuery(GET_ITEM_PROPERTIES_QUERY, {
    variables: {
      itemId: ItemId,
    },
  });

  if (loading || error) return null;
  type detailGridType = {
    keyword: string;
  };

  const DetailGrid = ({ keyword }: detailGridType) => {
    return (
      <Grid xs={2}>
        {keyword.includes("Modifier")
          ? convertPercent(
              data.item.properties[keyword as keyof typeof data.item.properties]
            )
          : data.item.properties[
              keyword as keyof typeof data.item.properties
            ] || "-"}
      </Grid>
    );
  };

  return (
    <>
      {!data.item.properties ? (
        <CustomSkelton />
      ) : (
        <>
          <Typography gutterBottom variant="subtitle1">
            詳細
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ maxHeight: 144, minHeight: 80, fontSize: "0.7rem" }}
          >
            {Object.keys(ITEM_PROPERTIES_WEAPON_MOD).map((key) =>
              data.item.properties[key as keyof typeof data.item.properties] ? (
                <>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_WEAPON_MOD[
                        key as keyof typeof ITEM_PROPERTIES_WEAPON_MOD
                      ]
                    }
                  </Grid>
                  <DetailGrid keyword={key} />
                </>
              ) : null
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default WeaponMod;
