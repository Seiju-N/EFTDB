import { Item } from "@/graphql/generated";
import { IconButton, Tooltip } from "@mui/material";
import { SnackbarItem } from "../SnackbarItem";
import PushPinIcon from "@mui/icons-material/PushPin";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

type Props = {
  currentItem: Item | null;
  handlePinClick: (id: string) => void;
  priceTrackerSet: Set<string>;
  open: boolean;
  handleClose: () => void;
  DEFAULT_ITEMS_COUNT_LIMIT: number;
};

export const PinIcon = ({
  currentItem,
  handlePinClick,
  priceTrackerSet,
  open,
  handleClose,
  DEFAULT_ITEMS_COUNT_LIMIT,
}: Props) => {
  if (!currentItem) return null;
  return (
    <>
      {priceTrackerSet.has(currentItem.id) ? (
        <Tooltip title="Remove item price tracker">
          <IconButton
            disableRipple
            onClick={() => handlePinClick(currentItem.id)}
          >
            <PlaylistRemoveIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add price tracker">
          <IconButton
            disableRipple
            onClick={() => handlePinClick(currentItem.id)}
          >
            <PushPinIcon />
          </IconButton>
        </Tooltip>
      )}
      <SnackbarItem
        priceTrackerSet={priceTrackerSet}
        currentItem={currentItem}
        open={open}
        handleClose={handleClose}
        DEFAULT_ITEMS_COUNT_LIMIT={DEFAULT_ITEMS_COUNT_LIMIT}
      />
    </>
  );
};
