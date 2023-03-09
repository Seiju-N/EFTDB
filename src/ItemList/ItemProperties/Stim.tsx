import { List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "../utils";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesStim } from "@/graphql/generated";
import { LanguageDictContext } from "@/App";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesStim | null;
  };
};

const GET_ITEM_PROPERTIES_QUERY = gql`
  query getItemProperties($itemId: ID) {
    item(id: $itemId) {
      properties {
        ... on ItemPropertiesStim {
          cures
          stimEffects {
            skillName
          }
          useTime
        }
      }
    }
  }
`;

const Stim = ({ ItemId }: Props) => {
  const { ITEM_PROPERTIES_STIM } = useContext(LanguageDictContext);
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
  if (!data.item.properties) return null;
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
            <Grid xs={3} color="text.secondary">
              {ITEM_PROPERTIES_STIM.cures}
            </Grid>
            <Grid xs={3}>
              <List>
                {properties.cures?.map((cure, idx) => {
                  return <ListItem key={`${cure}_${idx}`}>{cure}</ListItem>;
                })}
              </List>
            </Grid>
            <Grid xs={3} color="text.secondary">
              {ITEM_PROPERTIES_STIM.stimEffects}
            </Grid>
            <Grid xs={3}>
              <List>
                {properties.stimEffects.map((stimEffect) => {
                  return (
                    <ListItem key={stimEffect?.skillName}>
                      {stimEffect?.skillName}
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Grid xs={3} color="text.secondary">
              {ITEM_PROPERTIES_STIM.useTime}
            </Grid>
            <Grid xs={3}>{properties.useTime}</Grid>
          </Grid>
        </>
      ) : (
        <CustomSkelton />
      )}
    </>
  );
};

export default Stim;
