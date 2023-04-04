import { memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Tooltip, Typography } from "@mui/material";
import { useHooks } from "./hooks";
import ScaleIcon from "@mui/icons-material/Scale";
import { Item } from "@/graphql/generated";

type Props = {
  currentItem: Item;
};

export const ItemWeight = memo(({ currentItem }: Props) => {
  const { flexCenter, ITEM_DETAIL_DIALOG } = useHooks();
  return (
    <Grid container spacing={2}>
      <Grid xs={6} sx={flexCenter}>
        <Tooltip title="Weight">
          <ScaleIcon style={{ height: "auto", paddingRight: 4 }} />
        </Tooltip>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {ITEM_DETAIL_DIALOG.WEIGHT}
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography variant="subtitle1" color="text.primary" component="div">
          {`${currentItem.weight} kg`}
        </Typography>
      </Grid>
    </Grid>
  );
});
