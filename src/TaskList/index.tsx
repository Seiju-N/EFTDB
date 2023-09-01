import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";

import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import FilterAlt from "@mui/icons-material/FilterAlt";

import { GridCellParams } from "@mui/x-data-grid";
import { useHooks } from "./hooks";
import { TabPanel } from "@/components/TabPanel";
import { DataGrid } from "@/components/DataGrid";
import { FinishRewards } from "./parts/FinishRewards";
import { StartRewards } from "./parts/StartRewards";
import { Requirements } from "./parts/Requirements";
import { TaskObjectives } from "./parts/TaskObjectives";
import { Task } from "@/graphql/generated";

export const TaskList = () => {
  const {
    handleChange,
    handleDialogOpen,
    handleDialogClose,
    lang,
    langDict,
    categories,
    dialogOpen,
    currentTask,
    filter,
    taskFilter,
    cols,
    defaultSort,
    taskData,
    loading,
    location,
    param,
  } = useHooks();

  const TaskDialog = () => {
    const [value, setValue] = useState(0);
    if (!currentTask) return null;
    const handleChange = useCallback(
      (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
      },
      []
    );

    return (
      <Dialog
        scroll="paper"
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
        sx={{
          minHeight: "70vh",
        }}
        aria-label="task dialog"
      >
        <DialogTitle
          sx={{
            height: 100,
            fontSize: "2.4rem",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url('${currentTask.taskImageLink}')`,
              backgroundPosition: "center",
              opacity: 0.4,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          <Box
            sx={{
              position: "relative",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {currentTask?.name}
          </Box>
        </DialogTitle>
        <Box
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="div"
        >
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label={langDict.TASK_DETAIL_DIALOG.Objective} />
            <Tab label={langDict.TASK_DETAIL_DIALOG.Requirements} />
            <Tab label={langDict.TASK_DETAIL_DIALOG.StartRewards} />
            <Tab label={langDict.TASK_DETAIL_DIALOG.FinishRewards} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TaskObjectives
            currentTask={currentTask}
            langDict={langDict}
            categories={categories}
            lang={lang}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Requirements currentTask={currentTask} langDict={langDict} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <StartRewards
            currentTask={currentTask}
            langDict={langDict}
            categories={categories}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <FinishRewards
            currentTask={currentTask}
            langDict={langDict}
            categories={categories}
          />
        </TabPanel>
      </Dialog>
    );
  };

  useEffect(() => {
    if (!location.state || !location.state.taskId || !taskData) return;
    const temp = taskData.tasks.find(
      (task: Task) => task.id === location.state.taskId
    );
    if (!temp) return;
    handleDialogOpen(temp);
    window.history.replaceState({}, document.title);
  }, [location, taskData]);

  if (!taskData || loading) {
    return (
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="h4" pl={2}>
          Loading...
        </Typography>
      </Box>
    );
  }

  const formatted =
    param.traderName === "all"
      ? taskData.tasks
      : taskData.tasks.filter((task: Task) => {
          if (task.trader.name === param.traderName) {
            return task;
          }
          return null;
        });
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={formatted.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        <Container sx={{ height: "100%" }}>
          <Icon fontSize="large">
            <FilterAlt />
          </Icon>
          <FormControl
            sx={{ m: 1, minWidth: 120, height: "100%" }}
            size="small"
          >
            <InputLabel shrink id="select-trader">
              Filter
            </InputLabel>
            <Select
              id="select-trader"
              displayEmpty
              value={filter}
              onChange={handleChange}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"kappaRequired"}>Kappa</MenuItem>
              <MenuItem value={"lightkeeperRequired"}>Lightkeeper</MenuItem>
            </Select>
          </FormControl>
          <Box height={"84vh"} mb={1}>
            <DataGrid
              columns={cols}
              rows={formatted}
              sx={{ cursor: "pointer" }}
              density="compact"
              disableSelectionOnClick
              disableColumnFilter
              initialState={{
                columns: {
                  columnVisibilityModel: { experience: false, trader: false },
                },
                sorting: defaultSort,
              }}
              filterModel={taskFilter}
              onCellClick={(event: GridCellParams) =>
                handleDialogOpen(event.row)
              }
            />
          </Box>
        </Container>
        <TaskDialog />
      </Box>
    </>
  );
};
