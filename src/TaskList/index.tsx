import React, { SyntheticEvent, useEffect, useState } from "react";

import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  FormControl,
  Icon,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import FilterAlt from "@mui/icons-material/FilterAlt";

import {
  Task,
  TaskObjectiveBasic,
  TaskObjectiveBuildItem,
  TaskObjectiveExperience,
  TaskObjectiveExtract,
  TaskObjectiveItem,
  TaskObjectiveMark,
  TaskObjectivePlayerLevel,
  TaskObjectiveQuestItem,
  TaskObjectiveShoot,
  TaskObjectiveSkill,
  TaskObjectiveTaskStatus,
  TaskObjectiveTraderLevel,
} from "../graphql/generated";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useHooks } from "./hooks";
import { useLocation, useParams } from "react-router-dom";
import { TabPanel } from "@/components/TabPanel";

export const TaskList = () => {
  const {
    handleChange,
    handleDialogOpen,
    handleDialogClose,
    isAllArrayElementsEmpty,
    dialogOpen,
    currentTask,
    filter,
    taskFilter,
    cols,
    defaultSort,
    taskData,
    loading,
  } = useHooks();

  type taskObjectiveType =
    | TaskObjectiveBasic[]
    | TaskObjectiveBuildItem[]
    | TaskObjectiveExperience[]
    | TaskObjectiveExtract[]
    | TaskObjectiveItem[]
    | TaskObjectiveMark[]
    | TaskObjectivePlayerLevel[]
    | TaskObjectiveQuestItem[]
    | TaskObjectiveShoot[]
    | TaskObjectiveSkill[]
    | TaskObjectiveTaskStatus[]
    | TaskObjectiveTraderLevel[];
  const param = useParams();

  const TaskDialog = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const NoInfo = () => {
      return (
        <Card sx={{ minHeight: "30vh" }} variant="outlined">
          <List component="div">
            <ListItem sx={{ pl: 4 }} divider>
              <ListItemText>Nothing</ListItemText>
            </ListItem>
          </List>
        </Card>
      );
    };

    const TaskObjectives = () => {
      if (!currentTask || !currentTask.objectives) return <NoInfo />;
      const objectives = currentTask.objectives as taskObjectiveType;
      return (
        <Card sx={{ minHeight: "30vh" }} variant="outlined">
          <List component="div">
            {objectives.map((data, idx) => (
              <ListItem sx={{ pl: 4 }} key={`${data?.id}_${idx}`}>
                <ListItemText>
                  {data?.optional ? "(Optional):" : ""}
                  {data?.description}
                  {"count" in data ? `( x ${data?.count} )` : ""}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Card>
      );
    };

    const StartRewards = () => {
      if (
        !currentTask ||
        !currentTask.startRewards ||
        isAllArrayElementsEmpty(currentTask.startRewards)
      )
        return <NoInfo />;
      return (
        <Card sx={{ minHeight: "30vh" }} variant="outlined">
          <List>
            {currentTask.startRewards.traderStanding.map((data, idx) => (
              <ListItem
                sx={{ pl: 4 }}
                key={`${data?.trader.id}_${idx}`}
              >{`${data?.trader.name}:${data?.standing}`}</ListItem>
            ))}
          </List>
        </Card>
      );
    };

    const FinishRewards = () => {
      if (!currentTask || !currentTask.finishRewards) return null;
      return (
        <Card sx={{ minHeight: "30vh" }} variant="outlined">
          <List>
            {currentTask.finishRewards.traderUnlock.map((data, idx) => (
              <ListItem
                sx={{ pl: 4 }}
                key={`${data?.id}_${idx}`}
              >{`Unlock trader ${data?.name}`}</ListItem>
            ))}
            {currentTask.finishRewards.traderStanding.map((data, idx) => (
              <ListItem
                sx={{ pl: 4 }}
                key={`${data?.trader.id}_${idx}`}
              >{`${data?.trader.name}: +${data?.standing}`}</ListItem>
            ))}
            {currentTask.finishRewards.skillLevelReward.map((data, idx) => (
              <ListItem
                sx={{ pl: 4 }}
                key={`${data?.name}_${idx}`}
              >{`Skill ${data?.name}: +${data?.level}`}</ListItem>
            ))}
            {currentTask.finishRewards.items.map((data, idx) => (
              <ListItem sx={{ pl: 4 }} key={`${data?.item.id}_${idx}`}>
                <ListItemText>{`${data?.item.name}: ${data?.count}`}</ListItemText>
              </ListItem>
            ))}
            {currentTask.finishRewards.offerUnlock.map((data, idx) => (
              <ListItem sx={{ pl: 4 }} key={`${data?.id}_${idx}`}>
                <ListItemText>{`Unlock offer ${data?.item.name} at ${data?.trader.name}.`}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Card>
      );
    };
    return (
      <Dialog
        scroll="paper"
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        sx={{ minHeight: "70vh" }}
        aria-label="task dialog"
      >
        <DialogTitle>{currentTask?.name}</DialogTitle>
        <Box
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="div"
        >
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Task objectives" />
            <Tab label="Task start rewards" />
            <Tab label="Task finish rewards" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TaskObjectives />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StartRewards />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FinishRewards />
        </TabPanel>
      </Dialog>
    );
  };
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.taskId || !taskData.tasks) return;
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
          <Box height={"84vh"}>
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
