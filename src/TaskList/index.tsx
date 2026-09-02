import React, { useEffect } from "react";

import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import FilterAlt from "@mui/icons-material/FilterAlt";

import { GridCellParams } from "@mui/x-data-grid";
import { useHooks } from "./hooks";
import { DataGrid } from "@/components/DataGrid";
import { TaskDetailDialog } from "./TaskDetailDialog";
import { Task } from "@/api/types";

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
        <TaskDetailDialog
          currentTask={currentTask}
          dialogOpen={dialogOpen}
          handleDialogClose={handleDialogClose}
          categories={categories}
          langDict={langDict}
          lang={lang}
        />
      </Box>
    </>
  );
};
