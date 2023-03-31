import { Item } from "@/graphql/generated";
import { Alert, Snackbar } from "@mui/material";

type Props = {
  priceTrackerSet: Set<string>;
  currentItem: Item;
  open: boolean;
  handleClose: () => void;
  DEFAULT_ITEMS_COUNT_LIMIT: number;
};

export const SnackbarItem = ({
  open,
  handleClose,
  priceTrackerSet,
  currentItem,
  DEFAULT_ITEMS_COUNT_LIMIT,
}: Props) => {
  return (
    <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
      {priceTrackerSet.size >= DEFAULT_ITEMS_COUNT_LIMIT &&
      priceTrackerSet.has(currentItem.id) ? (
        <Alert severity="success" sx={{ width: "100%" }}>
          {"Item remove done."}
        </Alert>
      ) : priceTrackerSet.size >= DEFAULT_ITEMS_COUNT_LIMIT &&
        !priceTrackerSet.has(currentItem.id) ? (
        <Alert severity="error" sx={{ width: "100%" }}>
          {`Item price tracker limit reached. Max.${DEFAULT_ITEMS_COUNT_LIMIT}`}
        </Alert>
      ) : (
        <Alert severity="success" sx={{ width: "100%" }}>
          {"Item add done."}
        </Alert>
      )}
    </Snackbar>
  );
};
