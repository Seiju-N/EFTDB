import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesContainer } from "@/graphql/generated";
import { LanguageDictContext } from "@/App";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesContainer | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesContainer {
          capacity
          grid {
            filters {
              allowedCategories {
                name
              }
              allowedItems {
                name
              }
              excludedCategories {
                name
              }
              excludedItems {
                name
              }
            }
            width
            height
          }
        }
      }
    }
  }
`;

const Container = ({ ItemId }: Props) => {
  const { ITEM_PROPERTIES_CONTAINER } = useContext(LanguageDictContext);
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
            {properties.capacity ? (
              <>
                <Grid xs={3} color="text.secondary">
                  {ITEM_PROPERTIES_CONTAINER.capacity}
                </Grid>
                <Grid xs={3}>{properties.capacity}</Grid>
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

export default Container;
