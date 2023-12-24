import React from "react";
import { Panel, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import {
  Box,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useHooks } from "./hooks";

const TaskMapPlane = () => {
  const {
    isLoading,
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    showKappaRequired,
    handleCheckboxChange,
    ReactFlowStyled,
    MiniMapStyled,
    ControlsStyled,
    langDict,
  } = useHooks();

  return isLoading || (nodes.length === 0 && edges.length === 0) ? (
    <Container sx={{ height: "80vh", width: "100vw", overflow: "hidden" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: 20 }}>
          {langDict.LOADING.loading}
        </Typography>
      </Box>
    </Container>
  ) : (
    <Box sx={{ height: "80vh", width: "100vw", overflow: "hidden" }}>
      <ReactFlowStyled
        key={showKappaRequired ? "with-kappa" : "without-kappa"}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.1}
        fitView
        attributionPosition="bottom-left"
      >
        <Panel position="top-right">
          <Card sx={{ px: 2 }} variant="outlined">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showKappaRequired}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label={"Hide kappa required"}
            />
          </Card>
        </Panel>
        <MiniMapStyled />
        <ControlsStyled />
      </ReactFlowStyled>
    </Box>
  );
};

export const TaskMap = () => {
  return (
    <ReactFlowProvider>
      <TaskMapPlane />
    </ReactFlowProvider>
  );
};
