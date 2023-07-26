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
  Grid,
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
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import LightModeIcon from "@mui/icons-material/LightMode";
import LockOpenIcon from "@mui/icons-material/LockOpen";

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
import { GridCellParams } from "@mui/x-data-grid";
import { useHooks } from "./hooks";
import { useLocation, useParams } from "react-router-dom";
import { TabPanel } from "@/components/TabPanel";
import { Link as RouterLink } from "react-router-dom";
import { addSign, toPascalCase } from "@/utils";
import { Item } from "@/components/Item";
import { ItemCenter } from "@/components/ItemCenter";
import { NoInfo } from "./NoInfo";
import { DataGrid } from "@/components/DataGrid";

export const TaskList = () => {
  const {
    handleChange,
    handleDialogOpen,
    handleDialogClose,
    isAllArrayElementsEmpty,
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

    const TaskObjectives = () => {
      if (!currentTask.objectives) return <NoInfo />;
      const objectives = currentTask.objectives as taskObjectiveType;
      return (
        <Card variant="outlined">
          <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
            <ListSubheader>
              {langDict.TASK_DETAIL_DIALOG.Objective}
            </ListSubheader>
            {objectives.map((data, idx) => (
              <Fragment key={`${data?.id}_${idx}`}>
                <ListItem sx={{ px: 4 }} disablePadding>
                  <ListItemText>
                    {data?.optional ? "(Optional):" : ""}
                    {data?.description}
                    {"count" in data ? `( x ${data?.count} )` : ""}
                  </ListItemText>
                  {isTaskObjectiveItem(data) && data.item.id ? (
                    <IconButton
                      component={RouterLink}
                      to={`/item/${toPascalCase(
                        categories?.find(
                          (category) =>
                            category?.name === data.item.category?.name
                        )?.normalizedName
                      )}`}
                      state={{ itemId: data.item?.id }}
                      edge="end"
                    >
                      <img
                        style={{ height: 40, width: "auto", maxWidth: "100%" }}
                        src={data.item?.iconLink?.toString()}
                        alt="Task objective item"
                      />
                    </IconButton>
                  ) : null}
                </ListItem>
                {isTaskObjectiveBuildItem(data)
                  ? data.attributes.map((attribute) => {
                      const { name, requirement } = attribute || {};
                      const { value, compareMethod } = requirement || {};
                      const operator = compareMethod
                        ? langDict.OPERATORS[compareMethod]
                        : "";

                      const text =
                        lang === "ja"
                          ? `${name} ${value} ${operator}`
                          : `${name} ${operator} ${value}`;

                      return (
                        <ListItem key={name} dense>
                          <ListItemText inset>{text}</ListItemText>
                        </ListItem>
                      );
                    })
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
                            categories?.find(
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
                            src={item?.iconLink?.toString()}
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
            {currentTask.neededKeys?.length !== 0 ? (
              <>
                <ListSubheader>
                  {langDict.TASK_DETAIL_DIALOG.NeededKeys}
                </ListSubheader>
                <Grid container px={2} spacing={1}>
                  {currentTask.neededKeys?.map((neededKey, idx) =>
                    neededKey?.keys?.map((key) => (
                      <Grid item xs={12} md={6} key={`${key?.id}_${idx}`}>
                        <RouterLink
                          to={`/item/${toPascalCase(
                            categories?.find(
                              (category) =>
                                category?.name === key?.category?.name
                            )?.normalizedName
                          )}`}
                          state={{ itemId: key?.id }}
                          style={{ textDecoration: "none" }}
                        >
                          <Item>
                            <img
                              style={{
                                height: 50,
                                width: "auto",
                                maxWidth: "100%",
                              }}
                              src={key?.iconLink?.toString()}
                              alt="Task needed key."
                            />
                            <Typography
                              sx={{
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                pl: 1,
                              }}
                              variant="body1"
                            >
                              {key?.name}
                            </Typography>
                          </Item>
                        </RouterLink>
                      </Grid>
                    ))
                  )}
                </Grid>
              </>
            ) : null}
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
            <ListSubheader>
              {langDict.TASK_DETAIL_DIALOG.TaskRequirements}
            </ListSubheader>
            {taskRequirements.map((data) => (
              <ListItem sx={{ pl: 2 }} key={data?.task.id} disableGutters>
                <ListItemButton
                  component={RouterLink}
                  to={`/task/${data?.task.trader.name}`}
                  state={{ taskId: data?.task?.id }}
                >
                  <ListItemText>{`${data?.task.name} ${
                    data?.status
                      ? langDict.TASK_STATUS[data?.status.toString()]
                      : null
                  }`}</ListItemText>
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
            <ListSubheader>
              {langDict.TASK_DETAIL_DIALOG.PlayerLevelRequirements}
            </ListSubheader>
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
        return (
          <Card variant="outlined">
            <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
              <ListSubheader>
                {langDict.TASK_DETAIL_DIALOG.StartRewardsItems}
              </ListSubheader>
              <NoInfo />
            </List>
          </Card>
        );
      return (
        <Card variant="outlined">
          <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
            <ListSubheader>
              {langDict.TASK_DETAIL_DIALOG.StartRewardsItems}
            </ListSubheader>
            <Grid container px={2} spacing={1}>
              {currentTask.startRewards.items.map((data, idx) => (
                <Grid item xs={12} md={6} key={`${data?.item.id}_${idx}`}>
                  <RouterLink
                    to={`/item/${toPascalCase(
                      categories?.find(
                        (category) =>
                          category?.name === data?.item.category?.name
                      )?.normalizedName
                    )}`}
                    state={{ itemId: data?.item.id }}
                    style={{ textDecoration: "none" }}
                  >
                    <Item>
                      <img
                        style={{
                          height: 50,
                          width: "auto",
                          maxWidth: "100%",
                        }}
                        src={data?.item.iconLink?.toString()}
                        alt="Task needed key."
                      />
                      <Typography
                        sx={{
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                        }}
                        variant="body1"
                      >
                        {data?.item.name}
                      </Typography>
                    </Item>
                  </RouterLink>
                </Grid>
              ))}
            </Grid>
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
            <ListSubheader>{langDict.TASK_DETAIL_DIALOG.Rewards}</ListSubheader>
            <Grid container px={2} spacing={1}>
              {
                // TODO: finishRewardsもItemCenter使用する
                currentTask.finishRewards.traderUnlock.map((data, idx) => (
                  <ListItem
                    sx={{ pl: 4 }}
                    key={`${data?.id}_${idx}`}
                  >{`Unlock trader ${data?.name}`}</ListItem>
                ))
              }
              {currentTask.finishRewards.traderStanding.map((data, idx) => (
                <Grid item xs={12} md={6} key={`${data?.trader.id}_${idx}`}>
                  <ItemCenter>
                    <SignalCellularAltIcon fontSize="small" />
                    <Typography
                      sx={{
                        alignItems: "center",
                        lineHeight: 1,
                      }}
                      p={0}
                      variant="subtitle2"
                    >
                      {data?.trader.name}
                    </Typography>
                    <Typography
                      sx={{
                        alignItems: "center",
                      }}
                      variant="subtitle1"
                    >
                      {addSign(data?.standing)}
                    </Typography>
                  </ItemCenter>
                </Grid>
              ))}
              {currentTask.finishRewards.skillLevelReward.map((data, idx) => (
                <Grid item xs={12} md={6} key={`${data?.name}_${idx}`}>
                  <ItemCenter>
                    <LightModeIcon fontSize="small" />
                    <Typography
                      sx={{
                        alignItems: "center",
                        lineHeight: 1,
                      }}
                      p={0}
                      variant="subtitle2"
                    >
                      {data?.name}
                    </Typography>
                    <Typography
                      sx={{
                        alignItems: "center",
                      }}
                      variant="subtitle1"
                    >
                      {addSign(data?.level)}
                    </Typography>
                  </ItemCenter>
                </Grid>
              ))}
              {currentTask.finishRewards.items.map((data, idx) => (
                <Grid item xs={12} md={6} key={`${data?.item.id}_${idx}`}>
                  <RouterLink
                    to={`/item/${toPascalCase(
                      categories?.find(
                        (category) =>
                          category?.name === data?.item.category?.name
                      )?.normalizedName
                    )}`}
                    state={{ itemId: data?.item.id }}
                    style={{ textDecoration: "none" }}
                  >
                    <Item>
                      <img
                        style={{
                          height: 50,
                          width: "auto",
                          maxWidth: "100%",
                        }}
                        src={data?.item.iconLink?.toString()}
                        alt="Task needed key."
                      />
                      <Typography
                        sx={{
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                        }}
                        variant="body1"
                      >
                        {data?.item.name}
                        {data?.count && data?.count > 1
                          ? ` (${data?.count})`
                          : null}
                      </Typography>
                    </Item>
                  </RouterLink>
                </Grid>
              ))}
              {currentTask.finishRewards.offerUnlock.map((data, idx) => (
                <Grid item xs={12} md={6} key={`${data?.item.id}_${idx}`}>
                  <RouterLink
                    to={`/item/${toPascalCase(
                      categories?.find(
                        (category) =>
                          category?.name === data?.item.category?.name
                      )?.normalizedName
                    )}`}
                    state={{ itemId: data?.item.id }}
                    style={{ textDecoration: "none" }}
                  >
                    <Item>
                      <img
                        style={{
                          height: 50,
                          width: "auto",
                          maxWidth: "100%",
                        }}
                        src={data?.item.iconLink?.toString()}
                        alt="Offer unlock item."
                      />
                      <LockOpenIcon
                        fontSize="small"
                        sx={{
                          position: "absolute",
                          top: 2,
                          left: 44,
                        }}
                      />
                      <Typography
                        sx={{
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                        }}
                        variant="body1"
                      >
                        {data?.item.name}
                      </Typography>
                    </Item>
                  </RouterLink>
                </Grid>
              ))}
            </Grid>
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
