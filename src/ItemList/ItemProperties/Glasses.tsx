import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment } from "react";

import { ITEM_PROPERTIES_GLASSES } from "../../constants/LANG_VALUES";
import { CustomSkelton, translateMaterialName } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";

type Props = {
  ItemId: string;
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesGlasses {
          blindnessProtection
          class
          durability
          material {
            name
          }
          repairCost
        }
      }
    }
  }
`;

const Glasses = ({ ItemId }: Props) => {
  type detailGridType = {
    keyword: string;
  };

  const { loading, error, data } = useQuery(GET_ITEM_PROPERTIES_QUERY, {
    variables: {
      itemId: ItemId,
    },
  });

  if (error) return null;
  if (loading) return <Loading />;

  const DetailGrid = ({ keyword }: detailGridType) => {
    if (keyword === "material") {
      if (!data.item.properties?.material) return null;
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
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {Object.keys(ITEM_PROPERTIES_GLASSES).map((key, idx) =>
              data.item.properties[key as keyof typeof data.item.properties] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_GLASSES[
                        key as keyof typeof ITEM_PROPERTIES_GLASSES
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

export default Glasses;
