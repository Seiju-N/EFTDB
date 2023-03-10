import { Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";

import { ITEM_PROPERTIES_WEAPON } from "../../constants/LANG_VALUES";
import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { Item, ItemPropertiesWeapon } from "@/graphql/generated";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesWeapon;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesWeapon {
          caliber
          centerOfImpact
          defaultErgonomics
          defaultHeight
          defaultRecoilHorizontal
          defaultRecoilVertical
          defaultWeight
          defaultWidth
          deviationCurve
          deviationMax
          effectiveDistance
          ergonomics
          fireModes
          fireRate
          maxDurability
          recoilHorizontal
          recoilVertical
          repairCost
          sightingRange
        }
      }
    }
  }
`;

const Weapon = ({ ItemId }: Props) => {
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_QUERY,
    {
      variables: {
        itemId: ItemId,
      },
    }
  );

  if (!data || !data.item || error) return null;
  if (loading) return <Loading />;

  const DetailGrid = () => {
    return (
      <Grid item xs={2}>
        <Typography>null</Typography>
      </Grid>
    );
  };
  return (
    <>
      {data.item.properties ? (
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
            {Object.keys(data.item.properties).map((key, idx) =>
              data.item.properties[key as keyof ItemPropertiesWeapon] ? (
                <Fragment key={idx}>
                  <Grid item xs={4} color="text.secondary">
                    {
                      ITEM_PROPERTIES_WEAPON[
                        key as keyof typeof ITEM_PROPERTIES_WEAPON
                      ]
                    }
                  </Grid>
                  <DetailGrid />
                </Fragment>
              ) : null
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Weapon;
