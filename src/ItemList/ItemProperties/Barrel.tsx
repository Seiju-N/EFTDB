import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useContext } from "react";

import { convertPercent, CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesBarrel } from "@/graphql/generated";
import { LanguageDictContext } from "@/App";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesBarrel | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesBarrel {
          centerOfImpact
          deviationCurve
          deviationMax
          ergonomics
          recoilModifier
        }
      }
    }
  }
`;

const Barrel = ({ ItemId }: Props) => {
  const { ITEM_PROPERTIES_BARREL } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_QUERY,
    {
      variables: {
        itemId: ItemId,
      },
    }
  );

  if (loading) return <Loading />;
  if (!data || error) return null;
  const properties = data.item.properties;

  return (
    <>
      {properties ? (
        <>
          <Typography gutterBottom variant="subtitle1">
            詳細
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.centerOfImpact ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.centerOfImpact}
                </Grid>
                <Grid xs={3}>{properties.centerOfImpact}</Grid>
              </>
            ) : null}
            {properties.deviationCurve ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.deviationCurve}
                </Grid>
                <Grid xs={3}>{properties.deviationCurve}</Grid>
              </>
            ) : null}
            {properties.deviationMax ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.deviationMax}
                </Grid>
                <Grid xs={3}>{properties.deviationMax}</Grid>
              </>
            ) : null}
            {properties.ergonomics ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.ergonomics}
                </Grid>
                <Grid xs={3}>{properties.ergonomics}</Grid>
              </>
            ) : null}
            {properties.recoilModifier ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_BARREL.recoilModifier}
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

export default Barrel;
