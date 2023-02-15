import React, { useEffect, useState } from "react";

import {
  Box,
  Backdrop,
  CircularProgress,
  Container,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Card,
  ListSubheader,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  Icon,
} from "@mui/material";

import FilterAlt from "@mui/icons-material/FilterAlt";

import { Task } from "../graphql/generated";
import { DataGrid } from "@mui/x-data-grid";
import { useHooks } from "./hooks";
import { useLocation, useParams } from "react-router-dom";

const fetchParams = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

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
  } = useHooks();

  const [tasks, setTasks] = useState<Task[]>([]);
  const param = useParams();
  const CustomDialog = () => {
    const TaskObjectives = () => {
      if (!currentTask) return null;
      return (
        <Card variant="outlined">
          <ListSubheader sx={{ lineHeight: "24px" }}>
            Task objectives
          </ListSubheader>
          {currentTask.objectives.map((data, idx) => (
            <ListItem sx={{ pl: 4 }} divider key={`${data?.id}_${idx}`}>
              <ListItemText>
                {data?.optional ? "(Optional):" : ""}
                {data?.description}
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

    const DetailDialog = () => {
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
                      <ListItem
                        sx={{ pl: 4 }}
                        divider
                        key={`${data?.id}_${idx}`}
                      >
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

    return <DetailDialog />;
  };

  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.taskId) return;
    const temp = tasks.find((task) => task.id === location.state.taskId);
    if (!temp) return;
    handleDialogOpen(temp);
    window.history.replaceState({}, document.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, tasks]);

  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            tasks(lang:ja){
              id
              name
              normalizedName
              experience
              minPlayerLevel
              traderLevelRequirements{
                trader{
                  name
                }
                level
              }
              taskRequirements{
                task{
                  name
                }
                status
              }
              kappaRequired
              lightkeeperRequired
              map{
                name
              }
              trader{
                id
                name
              }
              factionName
              objectives{
                id
                type
                description
                optional
                maps{
                  name
                }
              }
              startRewards{
                traderStanding{
                  trader{
                    name
                  }
                  standing
                }
                items{
                  item{
                    id
                    name
                  }
                  count
                  quantity
                  attributes{
                    type
                    name
                    value
                  }
                }
                offerUnlock{
                  trader{
                    name
                  }
                  level
                  item{
                    id
                    name
                  }
                }
                skillLevelReward{
                  name
                  level
                }
                traderUnlock{
                  name
                }
                craftUnlock{
                  station{
                    name
                  }
                  level
                  taskUnlock{
                    name
                  }
                }
              }
              finishRewards{
                traderStanding{
                  trader{
                    name
                  }
                  standing
                }
                items{
                  item{
                    id
                    name
                  }
                  count
                  quantity
                  attributes{
                    type
                    name
                    value
                  }
                }
                offerUnlock{
                  trader{
                    name
                  }
                  level
                  item{
                    id
                    name
                  }
                }
                skillLevelReward{
                  name
                  level
                }
                traderUnlock{
                  name
                }
              }
            }
          }`,
        }),
      })
        .then((r) => r.json())
        .then(({ data }) => {
          const formatted =
            param.traderName === "all"
              ? data.tasks
              : data.tasks.filter((task: Task) => {
                  if (task.trader.name === param.traderName) {
                    return task;
                  }
                  return null;
                });
          setTasks(formatted);
        });
    };
    access_api();
  }, [param.traderName]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={tasks.length === 0}
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
              rows={tasks}
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
              onCellClick={(event: any) => handleDialogOpen(event.row)}
            />
          </Box>
        </Container>
        <CustomDialog />
      </Box>
    </>
  );
};

export default TaskList;
