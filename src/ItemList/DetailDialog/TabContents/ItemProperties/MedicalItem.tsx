import { List, ListItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesMedicalItem } from "@/graphql/generated";
import { LanguageContext, LanguageDictContext } from "@/App";
import { GET_ITEM_PROPERTIES_MEDICAL_ITEM } from "@/query";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesMedicalItem | null;
  };
};

export const MedicalItem = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_MEDICAL_ITEM } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_MEDICAL_ITEM,
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
          <Grid
            container
            rowSpacing={1}
            sx={{ minHeight: 80, fontSize: "0.7rem" }}
          >
            {properties.cures ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MEDICAL_ITEM.cures}
                </Grid>
                <Grid xs={6} md={3}>
                  <List disablePadding>
                    {properties.cures.map((cure) => (
                      <ListItem disablePadding disableGutters key={cure}>
                        {cure}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </>
            ) : null}
            {properties.useTime ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MEDICAL_ITEM.useTime}
                </Grid>
                <Grid xs={6} md={3}>{`${properties.useTime} sec`}</Grid>
              </>
            ) : null}
            {properties.uses ? (
              <>
                <Grid xs={6} md={3} color="text.secondary">
                  {ITEM_PROPERTIES_MEDICAL_ITEM.uses}
                </Grid>
                <Grid
                  xs={6}
                  md={3}
                >{`${properties.uses}/${properties.uses}`}</Grid>
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
