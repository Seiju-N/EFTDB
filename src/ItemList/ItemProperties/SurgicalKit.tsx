import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment } from "react";

import { ITEM_PROPERTIES_SURGICAL_KIT } from "../../constants/LANG_VALUES";
import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";

type Props = {
  ItemId: string;
};
const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesSurgicalKit {
          cures
          maxLimbHealth
          minLimbHealth
          useTime
          uses
        }
      }
    }
  }
`;
const SurgicalKit = ({ ItemId }: Props) => {
  const { loading, error, data } = useQuery(GET_ITEM_PROPERTIES_QUERY, {
    variables: {
      itemId: ItemId,
    },
  });

  if (error) return null;
  if (loading) return <Loading />;

  type detailGridType = {
    keyword: string;
  };

  const DetailGrid = ({ keyword }: detailGridType) => {
    if (keyword.includes("uses")) {
      return (
        <Grid xs={2}>
          {`${
            data.item.properties[keyword as keyof typeof data.item.properties]
          }/${
            data.item.properties[keyword as keyof typeof data.item.properties]
          }`}
        </Grid>
      );
    } else if (keyword.includes("useTime")) {
      return (
        <Grid xs={2}>
          {`${
            data.item.properties[keyword as keyof typeof data.item.properties]
          }sec`}
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
            {Object.keys(ITEM_PROPERTIES_SURGICAL_KIT).map((key, idx) =>
              data.item.properties[key as keyof typeof data.item.properties] ? (
                <Fragment key={idx}>
                  <Grid xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_SURGICAL_KIT[
                        key as keyof typeof ITEM_PROPERTIES_SURGICAL_KIT
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

export default SurgicalKit;
