import React, { memo } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useHooks } from "./hooks";
import { ControlsStyled, ReactFlowStyled } from "./styledComponents";
import { TaskMapProvider } from "@/contexts/TaskMapContext";
import { MemorizedPanel } from "./Panel";
import { TaskDetailDialog } from "@/TaskList/TaskDetailDialog";

const MemorizedControls = memo(ControlsStyled);

const TaskMapPlane = () => {
  const {
    isLoading,
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    showKappaRequired,
    handleCheckboxChange,
    langDict,
    lang,
    categories,
    selectedTask,
    isTaskModalOpen,
    openTaskModal,
    closeTaskModal,
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
        minZoom={0.08}
        fitView
        attributionPosition="bottom-left"
        onlyRenderVisibleElements
      >
        <MemorizedPanel
          showKappaRequired={showKappaRequired}
          handleCheckboxChange={handleCheckboxChange}
        />
        <MemorizedControls />
      </ReactFlowStyled>
      <TaskDetailDialog
        currentTask={selectedTask}
        dialogOpen={isTaskModalOpen}
        handleDialogClose={closeTaskModal}
        categories={categories}
        langDict={langDict}
        lang={lang}
        onTaskSelect={openTaskModal}
      />
    </Box>
  );
};

export const TaskMap = () => {
  return (
    <TaskMapProvider>
      <ReactFlowProvider>
        <TaskMapPlane />
      </ReactFlowProvider>
    </TaskMapProvider>
  );
};
