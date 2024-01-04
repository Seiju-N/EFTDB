import React, { memo } from "react";
import { Panel } from "reactflow";
import "reactflow/dist/style.css";
import { Box, Button, Card, Checkbox, FormControlLabel } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { alpha } from "@mui/material/styles";
import { useTaskMap } from "@/contexts/TaskMapContext";

type MemorizedPanelProps = {
  showKappaRequired: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MemorizedPanel = memo(
  ({ showKappaRequired, handleCheckboxChange }: MemorizedPanelProps) => {
    const { nodes, setNodes } = useTaskMap();
    const handleReset = () => {
      const updatedNodes = nodes.map((node) => ({
        ...node,
        data: { ...node.data, isNodeChecked: false },
      }));
      localStorage.setItem("checkedNodes", "{}");
      return setNodes(updatedNodes);
    };
    return (
      <Panel position="top-right">
        <Card
          sx={{
            backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 0.7),
            px: 2,
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
          <Box sx={{ pb: 1 }}>
            <Button
              startIcon={<RestartAltIcon />}
              variant="outlined"
              color="inherit"
              onClick={handleReset}
            >
              {"Reset"}
            </Button>
          </Box>
        </Card>
      </Panel>
    );
  }
);
