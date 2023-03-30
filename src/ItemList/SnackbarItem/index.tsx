import { Item } from "@/graphql/generated";
import { Alert, Snackbar } from "@mui/material";

type Props = {
  priceTrackerSet: Set<string>;
  currentItem: Item;
  open: boolean;
  handleClose: () => void;
};

export const SnackbarItem = ({
  open,
  handleClose,
  priceTrackerSet,
  currentItem,
}: Props) => {
  return (
    <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
      {priceTrackerSet.size >= 5 && priceTrackerSet.has(currentItem.id) ? (
        <Alert severity="success" sx={{ width: "100%" }}>
          {"Item remove done."}
        </Alert>
      ) : priceTrackerSet.size >= 5 && !priceTrackerSet.has(currentItem.id) ? (
        <Alert severity="error" sx={{ width: "100%" }}>
          {"Item price tracker limit reached."}
        </Alert>
      ) : (
        <Alert severity="success" sx={{ width: "100%" }}>
          {"Item add done."}
        </Alert>
      )}
    </Snackbar>
  );
};
