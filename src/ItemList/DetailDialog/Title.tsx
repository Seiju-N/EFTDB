import { memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { DialogTitle, IconButton, Tooltip } from "@mui/material";
import { PinIcon } from "./PinIcon";
import { Item } from "@/graphql/generated";
import { useHooks } from "./hooks";
import LanguageIcon from "@mui/icons-material/Language";

type Props = {
  currentItem: Item;
};

export const DetailDialogTitle = memo(({ currentItem }: Props) => {
  const {
    handlePinClick,
    handleClose,
    handleWikiLinkClick,
    priceTrackerSet,
    open,
    DEFAULT_ITEMS_COUNT_LIMIT,
  } = useHooks();
  return (
    <Grid container>
      <Grid xs={10}>
        <DialogTitle>{currentItem.name}</DialogTitle>
      </Grid>
      <Grid xs={2} sx={{ display: "flex", justifyContent: "center" }}>
        <PinIcon
          currentItem={currentItem}
          handlePinClick={handlePinClick}
          priceTrackerSet={priceTrackerSet}
          open={open}
          handleClose={handleClose}
          DEFAULT_ITEMS_COUNT_LIMIT={DEFAULT_ITEMS_COUNT_LIMIT}
        />
        <Tooltip title="WiKi link">
          {currentItem.wikiLink && currentItem.wikiLink !== "" ? (
            <IconButton
              disableRipple
              onClick={() => handleWikiLinkClick(currentItem.wikiLink)}
            >
              <LanguageIcon />
            </IconButton>
          ) : (
            <IconButton disableRipple disabled>
              <LanguageIcon />
            </IconButton>
          )}
        </Tooltip>
      </Grid>
    </Grid>
  );
});
