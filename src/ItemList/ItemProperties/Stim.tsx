import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment, useContext } from "react";

import { convertPercent, CustomSkelton } from "../utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesStim } from "@/graphql/generated";
import { LanguageContext, LanguageDictContext } from "@/App";
import { GET_ITEM_PROPERTIES_STIM } from "@/query";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesStim | null;
  };
};

export const Stim = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_STIM } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_STIM,
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
  console.log(properties);
  return (
    <>
      {properties ? (
        <>
          <Typography gutterBottom variant="subtitle1">
            {ITEM_PROPERTIES_STIM.title}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.cures ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_STIM.cures}
                </Grid>
                <Grid xs={6} md={3}>
                  {properties.cures.join(", ")}
                </Grid>
              </>
            ) : null}
            {properties.stimEffects.length !== 0 ? (
              <>
                <Grid xs={12}>
                  <Typography>{ITEM_PROPERTIES_STIM.stimEffects}</Typography>
                </Grid>
                {properties.stimEffects.map((effect, idx) => (
                  <Fragment key={`${effect?.skillName}_${idx}`}>
                    <Grid xs={6} md={3} color="text.secondary">
                      {effect?.skillName ? effect?.skillName : effect?.type}
                    </Grid>
                    <Grid xs={6} md={3}>
                      {effect?.chance === 1
                        ? `${effect?.duration}sec`
                        : `${convertPercent(effect?.chance)} ${
                            effect?.duration
                          }sec`}
                    </Grid>
                  </Fragment>
                ))}
              </>
            ) : null}
            {properties.useTime ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_STIM.useTime}
                </Grid>
                <Grid xs={6} md={3}>{`${properties.useTime} sec`}</Grid>
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
