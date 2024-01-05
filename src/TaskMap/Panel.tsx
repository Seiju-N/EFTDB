import React, { memo, useCallback, useContext, useState } from "react";
import { Panel, useReactFlow } from "reactflow";
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
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { alpha } from "@mui/material/styles";
import { useTaskMap } from "@/contexts/TaskMapContext";
import { Node } from "reactflow";
import { LanguageDictContext } from "@/App";

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
    const langDict = useContext(LanguageDictContext);
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
          <DialogContentText>{langDict.TASKMAP.resetMsg}</DialogContentText>
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

const NODE_WIDTH = 200;
const NODE_HEIGHT = 30;

export const MemorizedPanel = memo(
  ({ showKappaRequired, handleCheckboxChange }: MemorizedPanelProps) => {
    const reactFlowInstance = useReactFlow();
    const { nodes, setNodes } = useTaskMap();
    const langDict = useContext(LanguageDictContext);
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState<string>("");
    const [searchIndex, setSearchIndex] = useState<number>(0);
    const [lastSearchText, setLastSearchText] = useState<string>("");
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);
    const handleSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        if (event.target.value !== lastSearchText) {
          setSearchIndex(0);
        }
      },
      [lastSearchText]
    );

    const handleSearchClick = useCallback(() => {
      const filteredNodes = nodes
        .filter((node) =>
          node.data.taskName.toLowerCase().startsWith(searchText.toLowerCase())
        )
        .sort((a, b) => a.position.x - b.position.x);

      if (filteredNodes.length > 0) {
        const targetNode = filteredNodes[searchIndex % filteredNodes.length];
        const { x, y } = targetNode.position;
        const newZoom = 0.5;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const centerX =
          -x * newZoom + viewportWidth / 2 - (NODE_WIDTH * newZoom) / 2;
        const centerY =
          -y * newZoom + viewportHeight / 2 - (NODE_HEIGHT * newZoom) / 2 - 100;
        reactFlowInstance.setViewport({
          x: centerX,
          y: centerY,
          zoom: newZoom,
        });

        setSearchIndex((prevIndex) => prevIndex + 1);
        setLastSearchText(searchText);
      }
    }, [searchText, nodes, reactFlowInstance, searchIndex]);

    const handleFormSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSearchClick();
      },
      [handleSearchClick]
    );
    return (
      <Panel position="top-right">
        <Card
          sx={{
            backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 0.8),
            px: 2,
            border: "2px solid rgba(255, 255, 255, 0.5)",
          }}
          variant="outlined"
        >
          <Box sx={{ py: 1, width: "100%" }}>
            <FormControl
              variant="standard"
              fullWidth
              component={"form"}
              onSubmit={handleFormSubmit}
            >
              <TextField
                margin="dense"
                sx={{ width: "100%" }}
                label="Task Search"
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton size="small" onClick={handleSearchClick}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type="search"
                variant="filled"
              />
            </FormControl>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={showKappaRequired}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label={langDict.TASKMAP.kappaOnly}
            sx={{ mb: 1 }}
          />

          <Box
            sx={{
              pb: 1,
              width: "100%",
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
