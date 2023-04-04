import { memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Tooltip, Typography } from "@mui/material";
import ZoomOutMap from "@mui/icons-material/ZoomOutMap";
import { useHooks } from "./hooks";
import { Item } from "@/graphql/generated";

type Props = {
  currentItem: Item;
};

export const ItemSize = memo(({ currentItem }: Props) => {
  const { flexCenter, ITEM_DETAIL_DIALOG } = useHooks();
  return (
    <Grid container spacing={2}>
      <Grid xs={6} sx={flexCenter}>
        <Tooltip title="Size">
          <ZoomOutMap style={{ height: "auto", paddingRight: 4 }} />
        </Tooltip>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {ITEM_DETAIL_DIALOG.SIZE}
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography variant="subtitle1" color="text.primary" component="div">
          {`${ITEM_DETAIL_DIALOG.WIDTH}: ${currentItem.width}   ${ITEM_DETAIL_DIALOG.HEIGHT}: ${currentItem.height}`}
        </Typography>
      </Grid>
    </Grid>
  );
});
