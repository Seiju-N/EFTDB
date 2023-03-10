import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "../utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesSurgicalKit } from "@/graphql/generated";
import { LanguageContext, LanguageDictContext } from "@/App";
import { GET_ITEM_PROPERTIES_SURGICAL_KIT } from "@/query";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesSurgicalKit | null;
  };
};

export const SurgicalKit = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_SURGICAL_KIT } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_SURGICAL_KIT,
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
            {ITEM_PROPERTIES_SURGICAL_KIT.title}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.cures ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_SURGICAL_KIT.cures}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.cures.join(", ")}
                </Grid>
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
