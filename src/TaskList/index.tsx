import React, {
  Fragment,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
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
import { Link as RouterLink } from "react-router-dom";
import { toPascalCase } from "@/utils";

export const TaskList = () => {
  const {
    handleChange,
    handleDialogOpen,
    handleDialogClose,
    isAllArrayElementsEmpty,
    categories,
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

  const isTaskObjectiveItem = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objective: any
  ): objective is TaskObjectiveItem => "item" in objective;

  const isTaskObjectiveBuildItem = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objective: any
  ): objective is TaskObjectiveBuildItem => "attributes" in objective;

  const param = useParams();

  const TaskDialog = () => {
    const [value, setValue] = useState(0);
    if (!currentTask) return null;

    const handleChange = useCallback(
      (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
      },
      []
    );

    const NoInfo = () => {
      return (
        <Card variant="outlined">
          <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText>Nothing</ListItemText>
            </ListItem>
          </List>
        </Card>
      );
    };

    const TaskObjectives = () => {
      if (!currentTask.objectives) return <NoInfo />;
      const objectives = currentTask.objectives as taskObjectiveType;
      return (
        <Card variant="outlined">
          <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
            {objectives.map((data, idx) => (
              <Fragment key={`${data?.id}_${idx}`}>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText>
                    {data?.optional ? "(Optional):" : ""}
                    {data?.description}
                    {"count" in data ? `( x ${data?.count} )` : ""}
                  </ListItemText>
                  {isTaskObjectiveItem(data) && data.item.id ? (
                    <IconButton
                      component={RouterLink}
                      to={`/item/${toPascalCase(
                        categories.find(
                          (category) =>
                            category?.name === data.item.category?.name
                        )?.normalizedName
                      )}`}
                      state={{ itemId: data.item?.id }}
                      edge="end"
                    >
                      <img
                        style={{ height: 40, width: "auto", maxWidth: "100%" }}
                        src={data.item?.inspectImageLink?.toString()}
                        alt="Task objective item"
                      />
                    </IconButton>
                  ) : null}
                </ListItem>
                {isTaskObjectiveBuildItem(data)
                  ? data.attributes.map((attribute) => (
                      <ListItem key={attribute?.name} dense>
                        <ListItemText
                          inset
                        >{`${attribute?.name} ${attribute?.requirement.compareMethod} ${attribute?.requirement.value}`}</ListItemText>
                      </ListItem>
                    ))
                  : null}
                {isTaskObjectiveBuildItem(data)
                  ? data.containsAll.map((item) => (
                      <ListItem key={item?.id} dense>
                        <ListItemText
                          inset
                        >{`Required any ${item?.name}`}</ListItemText>
                        <IconButton
                          component={RouterLink}
                          to={`/item/${toPascalCase(
                            categories.find(
                              (category) =>
                                category?.name === item?.category?.name
                            )?.normalizedName
                          )}`}
                          state={{ itemId: item?.id }}
                          edge="end"
                        >
                          <img
                            style={{
                              height: 40,
                              width: "auto",
                              maxWidth: "100%",
                            }}
                            src={item?.inspectImageLink?.toString()}
                            alt="Task objective item"
                          />
                        </IconButton>
                      </ListItem>
                    ))
                  : null}
                {isTaskObjectiveBuildItem(data)
                  ? data.containsCategory.map((category) => (
                      <ListItem key={category?.name} dense>
                        <ListItemText
                          inset
                        >{`Required any ${category?.name}`}</ListItemText>
                      </ListItem>
                    ))
                  : null}
              </Fragment>
            ))}
          </List>
        </Card>
      );
    };

    const Requirements = () => {
      const TaskRequirements = () => {
        if (
          !currentTask.taskRequirements ||
          currentTask.taskRequirements.length === 0
        )
          return null;
        const taskRequirements = currentTask.taskRequirements;
        return (
          <>
            <ListSubheader>Task requirements</ListSubheader>
            {taskRequirements.map((data) => (
              <ListItem sx={{ pl: 2 }} key={data?.task.id}>
                <ListItemButton
                  component={RouterLink}
                  to={`/task/${data?.task.trader.name}`}
                  state={{ taskId: data?.task?.id }}
                >
                  <ListItemText>{`Task ${data?.task.name} ${data?.status}`}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </>
        );
      };

      const PlayerLevelRequirements = () => {
        if (!currentTask.minPlayerLevel) return null;
        const minPlayerLevel = currentTask.minPlayerLevel;
        return (
          <>
            <ListSubheader>Player level requirements</ListSubheader>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText>{`Player level ${minPlayerLevel}`}</ListItemText>
            </ListItem>
          </>
        );
      };

      const TraderRequirements = () => {
        if (
          !currentTask.traderRequirements ||
          currentTask.traderRequirements.length === 0
        )
          return null;
        const traderRequirements = currentTask.traderRequirements;
        return (
          <>
            <ListSubheader>Trader requirements</ListSubheader>
            {traderRequirements.map((data) => (
              <ListItem sx={{ pl: 4 }} key={data?.trader.id}>
                <ListItemText>{`${data?.trader.name} LL ${data?.value}`}</ListItemText>
              </ListItem>
            ))}
          </>
        );
      };

      return (
        <Card variant="outlined">
          <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
            <TaskRequirements />
            <PlayerLevelRequirements />
            <TraderRequirements />
          </List>
        </Card>
      );
    };

    const StartRewards = () => {
      if (
        !currentTask.startRewards ||
        isAllArrayElementsEmpty(currentTask.startRewards)
      )
        return <NoInfo />;
      return (
        <Card variant="outlined">
          <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
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
      if (!currentTask.finishRewards) return null;
      return (
        <Card variant="outlined">
          <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
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
            <Tab label="Objectives" />
            <Tab label="Requirements" />
            <Tab label="Start rewards" />
            <Tab label="Finish rewards" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TaskObjectives />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Requirements />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <StartRewards />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <FinishRewards />
        </TabPanel>
      </Dialog>
    );
  };
  const location = useLocation();

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
