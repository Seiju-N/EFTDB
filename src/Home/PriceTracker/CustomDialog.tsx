import { dictType } from "@/constants/languages/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { memo } from "react";

type Props = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  langDict: dictType;
};

export const CustomDialog = memo(
  ({ open, handleOk, handleCancel, langDict }: Props) => {
    return (
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>
          {langDict.HOME_SENTENCE.price_tracker.dialog_title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {langDict.HOME_SENTENCE.price_tracker.dialog_description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>OK</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
);
