import FilterAlt from "@mui/icons-material/FilterAlt";
import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Icon,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useHooks } from "./hooks";
import type {
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
import { useQuery } from "@apollo/client";
import { LanguageContext } from "../App";

const TaskList = () => {
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
    localeText,
    defaultSort,
    GET_TASKS_QUERY,
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
  const language = useContext(LanguageContext);
  const CustomDialog = () => {
    const TaskObjectives = () => {
      if (!currentTask) return null;
      const objectives = currentTask.objectives as taskObjectiveType;
      return (
        <Card variant="outlined">
          <ListSubheader sx={{ lineHeight: "24px" }}>
            Task objectives
          </ListSubheader>
          {objectives.map((data, idx) => (
            <ListItem sx={{ pl: 4 }} divider key={`${data?.id}_${idx}`}>
              <ListItemText>
                {data?.optional ? "(Optional):" : ""}
                {data?.description}
                {"count" in data ? `( x ${data?.count} )` : ""}
              </ListItemText>
            </ListItem>
          ))}
        </Card>
      );
    };

    const StartRewards = () => {
      if (
        !currentTask ||
        !currentTask.startRewards ||
        isAllArrayElementsEmpty(currentTask.startRewards)
      )
        return null;
      return (
        <Card variant="outlined">
          <ListSubheader sx={{ lineHeight: "24px" }}>
            Task start rewards
          </ListSubheader>
          {currentTask.startRewards.traderStanding.map((data, idx) => (
            <ListItem
              sx={{ pl: 4 }}
              key={`${data?.trader.id}_${idx}`}
            >{`${data?.trader.name}:${data?.standing}`}</ListItem>
          ))}
        </Card>
      );
    };

    const FinishRewards = () => {
      if (!currentTask || !currentTask.finishRewards) return null;
      return (
        <Card variant="outlined">
          <>
            <ListSubheader sx={{ lineHeight: "24px" }}>
              Task finish rewards
            </ListSubheader>
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
          </>
        </Card>
      );
    };

    return (
      <Dialog
        scroll="paper"
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
      >
        <DialogTitle>{currentTask?.name}</DialogTitle>
        <DialogContent>
          <List dense sx={{ bgcolor: "background.paper", pb: 0, pt: 0 }}>
            <Card variant="outlined">
              <ListSubheader sx={{ lineHeight: "24px" }}>
                Task unlock requirements
              </ListSubheader>
              {currentTask?.minPlayerLevel ||
              currentTask?.traderLevelRequirements.length !== 0 ? (
                <>
                  {currentTask?.minPlayerLevel ? (
                    <ListItem sx={{ pl: 4 }} divider>
                      <ListItemText>{`PMC Lv.${currentTask.minPlayerLevel}`}</ListItemText>
                    </ListItem>
                  ) : null}
                  {currentTask?.traderLevelRequirements.map((data, idx) => (
                    <ListItem sx={{ pl: 4 }} divider key={`${data?.id}_${idx}`}>
                      <ListItemText>{`${data?.trader.name}:Lv.${data?.level}`}</ListItemText>
                    </ListItem>
                  ))}
                  {currentTask?.taskRequirements.map((data, idx) => (
                    <ListItem
                      sx={{ pl: 4 }}
                      divider
                      key={`${data?.task.id}_${idx}`}
                    >
                      <ListItemText>{`${data?.task.name} -> ${data?.status}`}</ListItemText>
                    </ListItem>
                  ))}
                </>
              ) : (
                <Typography sx={{ pl: 4 }} color="action.disabled">
                  No requirements to unlock
                </Typography>
              )}
            </Card>
            <TaskObjectives />
            <StartRewards />
            <FinishRewards />
          </List>
        </DialogContent>
      </Dialog>
    );
  };

  const location = useLocation();
  const { loading, error, data } = useQuery(GET_TASKS_QUERY, {
    variables: {
      lang: language,
    },
  });
  useEffect(() => {
    if (!location.state || !location.state.taskId) return;
    const temp = data.tasks.find(
      (task: { id: string }) => task.id === location.state.taskId
    );
    if (!temp) return;
    handleDialogOpen(temp);
    window.history.replaceState({}, document.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, data]);
  if (loading || error) return null;

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={data.tasks.length === 0}
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
              rows={data.tasks}
              sx={{ cursor: "pointer" }}
              density="compact"
              localeText={localeText}
              disableSelectionOnClick
              disableColumnFilter
              initialState={{
                columns: {
                  columnVisibilityModel: { experience: false, trader: false },
                },
                sorting: defaultSort,
              }}
              filterModel={taskFilter}
              onCellClick={(params: GridCellParams) =>
                handleDialogOpen(params.row as Task)
              }
            />
          </Box>
        </Container>
        <CustomDialog />
      </Box>
    </>
  );
};

export default TaskList;
