import React, { Fragment } from "react";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { ITEM_PROPERTIES_ARMOR } from "../../constants/LANG_VALUES";
import { CustomSkelton, translateMaterialName } from "../utils";

import { gql, useQuery } from "@apollo/client";

type Props = {
  ItemId: string;
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesArmor {
          class
          durability
          ergoPenalty
          material {
            id
          }
          repairCost
          speedPenalty
          turnPenalty
        }
      }
    }
  }
`;

const Armor = ({ ItemId }: Props) => {
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
    if (keyword === "material") {
      if (!data.item.properties?.material) return null;
      return (
        <Grid xs={2}>
          {translateMaterialName(data.item.properties.material.id!)}
        </Grid>
      );
    }
    return (
      <Grid xs={2}>
        {data.item.properties![keyword as keyof typeof data.item.properties]}
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
            {Object.keys(ITEM_PROPERTIES_ARMOR).map((key, idx) =>
              data.item.properties![
                key as keyof typeof data.item.properties
              ] ? (
                <Fragment key={idx}>
                  <Grid xs={4} key={`_${idx}`} color="text.secondary">
                    {
                      ITEM_PROPERTIES_ARMOR[
                        key as keyof typeof ITEM_PROPERTIES_ARMOR
                      ]
                    }
                  </Grid>
                  <DetailGrid keyword={key} key={idx} />
                </Fragment>
              ) : null
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Armor;
