import React from "react";
import { Panel } from "reactflow";
import "reactflow/dist/style.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useHooks } from "./hooks";

export const TaskMap = () => {
  const {
    isLoading,
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    showKappaRequired,
    handleToggleKappaRequired,
    ReactFlowStyled,
    MiniMapStyled,
    ControlsStyled,
    langDict,
  } = useHooks();

  return isLoading ? (
    <Container>
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
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.2}
      >
        <Panel position="top-right">
          <Button
            onClick={handleToggleKappaRequired}
            color={showKappaRequired ? "primary" : "success"}
            variant={showKappaRequired ? "outlined" : "contained"}
          >
            {showKappaRequired ? "Show kappa required" : "Hide kappa required"}
          </Button>
        </Panel>
        <MiniMapStyled />
        <ControlsStyled />
      </ReactFlowStyled>
    </Box>
  );
};
