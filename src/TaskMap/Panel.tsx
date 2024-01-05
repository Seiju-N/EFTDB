import React, { memo, useCallback, useState } from "react";
import { Panel } from "reactflow";
import "reactflow/dist/style.css";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { alpha } from "@mui/material/styles";
import { useTaskMap } from "@/contexts/TaskMapContext";
import { Node } from "reactflow";

type MemorizedPanelProps = {
  showKappaRequired: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type CustomDialogProps = {
  nodes: Node[];
  open: boolean;
  handleClose: () => void;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
};

const CustomDialog = memo(
  ({ nodes, open, handleClose, setNodes }: CustomDialogProps) => {
    const handleReset = useCallback(() => {
      const updatedNodes = nodes.map((node) => ({
        ...node,
        data: { ...node.data, isNodeChecked: false },
      }));
      localStorage.setItem("checkedNodes", "{}");
      handleClose();
      return setNodes(updatedNodes);
    }, [nodes]);
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Reset"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"タスクの進捗状況をリセットしますか？"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} color="error" variant="outlined">
            {"Reset"}
          </Button>
          <Button onClick={handleClose} variant="outlined">
            {"Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export const MemorizedPanel = memo(
  ({ showKappaRequired, handleCheckboxChange }: MemorizedPanelProps) => {
    const { nodes, setNodes } = useTaskMap();
    const [open, setOpen] = useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);
    return (
      <Panel position="top-right">
        <Card
          sx={{
            backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 0.7),
            px: 2,
            border: "2px solid rgba(255, 255, 255, 0.5)",
          }}
          variant="outlined"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={showKappaRequired}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label={"Kappa required only"}
          />
          <Box
            sx={{
              // display: "flex",
              pb: 1,
              // pr: 1,
              width: "100%",
              // justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{ width: "100%" }}
              startIcon={<RestartAltIcon />}
              variant="contained"
              color="inherit"
              onClick={handleOpen}
            >
              {"Reset"}
            </Button>
            <CustomDialog {...{ nodes, open, handleClose, setNodes }} />
          </Box>
        </Card>
      </Panel>
    );
  }
);
