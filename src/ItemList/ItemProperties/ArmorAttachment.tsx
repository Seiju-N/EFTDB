import { gql, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment } from "react";

import { ITEM_PROPERTIES_ARMOR_ATTACHMENT } from "../../constants/LANG_VALUES";
import { CustomSkelton, translateMaterialName } from "../utils";

type Props = {
  ItemId: string;
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesArmorAttachment {
          blindnessProtection
          class
          durability
          ergoPenalty
          headZones
          material {
            name
          }
          repairCost
          speedPenalty
          turnPenalty
        }
      }
    }
  }
`;

const ArmorAttachment = ({ ItemId }: Props) => {
  type detailGridType = {
    keyword: string;
  };
  const { loading, error, data } = useQuery(GET_ITEM_PROPERTIES_QUERY, {
    variables: {
      itemId: ItemId,
    },
  });

  if (loading || error) return null;

  const DetailGrid = ({ keyword }: detailGridType) => {
    if (keyword === "material") {
      return (
        <Grid xs={2}>
          {translateMaterialName(data.item.properties.material.id)}
        </Grid>
      );
    } else {
      return (
        <Grid xs={2}>
          {data.item.properties[keyword as keyof typeof data.item.properties]}
        </Grid>
      );
    }
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
            {Object.keys(ITEM_PROPERTIES_ARMOR_ATTACHMENT).map((key, idx) =>
              data.item.properties[key as keyof typeof data.item.properties] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_ARMOR_ATTACHMENT[
                        key as keyof typeof ITEM_PROPERTIES_ARMOR_ATTACHMENT
                      ]
                    }
                  </Grid>
                  <DetailGrid keyword={key} />
                </Fragment>
              ) : null
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default ArmorAttachment;
