import { memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Tooltip, Typography } from "@mui/material";
import { useHooks } from "./hooks";
import CurrencyRuble from "@mui/icons-material/CurrencyRuble";
import { Item } from "@/graphql/generated";

type Props = {
  currentItem: Item;
};

export const BasePrice = memo(({ currentItem }: Props) => {
  const { flexCenter, ITEM_PROPERTIES } = useHooks();
  return (
    <Grid container spacing={2}>
      <Grid xs={6} sx={flexCenter}>
        <Tooltip title="Base price">
          <CurrencyRuble style={{ height: "auto", paddingRight: 4 }} />
        </Tooltip>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {ITEM_PROPERTIES.basePrice}
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography variant="subtitle1" color="text.primary" component="div">
          {`₽ ${currentItem.basePrice}`}
        </Typography>
      </Grid>
    </Grid>
  );
});
