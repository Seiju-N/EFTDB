import { memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Tooltip, Typography } from "@mui/material";
import { useHooks } from "./hooks";
import { Item } from "@/graphql/generated";
import QueryStats from "@mui/icons-material/QueryStats";

type Props = {
  currentItem: Item;
};

export const Avg24hPrice = memo(({ currentItem }: Props) => {
  const { flexCenter, ITEM_PROPERTIES } = useHooks();
  if (!currentItem.avg24hPrice) return null;
  return (
    <Grid container spacing={2}>
      <Grid xs={6} sx={flexCenter}>
        <Tooltip title="24h average price">
          <QueryStats style={{ height: "auto", paddingRight: 4 }} />
        </Tooltip>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {ITEM_PROPERTIES.avg24hPrice}
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography variant="subtitle1" color="text.primary" component="div">
          {`₽ ${currentItem.avg24hPrice}`}
        </Typography>
      </Grid>
    </Grid>
  );
});
