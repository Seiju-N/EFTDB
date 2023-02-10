import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Card,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useHooks } from "./hooks";
import { parsedTaskType } from "../../utils";
import {
  ContainedItem,
  Maybe,
  OfferUnlock,
  RequirementTrader,
  SkillLevel,
  TaskObjective,
  TaskStatusRequirement,
  Trader,
  TraderStanding,
} from "../../graphql/generated";

type Props = {
  taskData: parsedTaskType;
};

const RowChild = ({ taskData }: Props) => {
  const rowChildHooks = useHooks();
  const {
    handleClick,
    handleDialogOpen,
    handleDialogClose,
    listOpen,
    dialogOpen,
    currentTask,
    cols,
    localeText,
    defaultSort,
  } = rowChildHooks;

  const TaskObjectives = () => {
    if (!currentTask) return null;
    return (
      <Card variant="outlined">
        <ListSubheader sx={{ lineHeight: "24px" }}>
          Task objectives
        </ListSubheader>
        {currentTask.objectives.map((data: Maybe<TaskObjective>) => (
          <ListItem sx={{ pl: 4 }} divider key={data?.id}>
            <ListItemText>
              {data?.optional ? "(Optional):" : ""}
              {data?.description}
            </ListItemText>
          </ListItem>
        ))}
      </Card>
    );
  };

  const isAllArrayElementsEmpty = (obj: any) => {
    return Object.values(obj).every((val: any) => val.length === 0);
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
        {currentTask.startRewards.traderStanding.map(
          (data: Maybe<TraderStanding>) => (
            <ListItem
              sx={{ pl: 4 }}
              key={data?.trader.id}
            >{`${data?.trader.name}:${data?.standing}`}</ListItem>
          )
        )}
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
          {currentTask.finishRewards.traderUnlock.map((data: Maybe<Trader>) => (
            <ListItem
              sx={{ pl: 4 }}
              key={data?.id}
            >{`Unlock trader ${data?.name}`}</ListItem>
          ))}
          {currentTask.finishRewards.traderStanding.map(
            (data: Maybe<TraderStanding>) => (
              <ListItem
                sx={{ pl: 4 }}
                key={data?.trader.id}
              >{`${data?.trader.name}: +${data?.standing}`}</ListItem>
            )
          )}
          {currentTask.finishRewards.skillLevelReward.map(
            (data: Maybe<SkillLevel>, idx: number) => (
              <ListItem
                sx={{ pl: 4 }}
                key={`${data?.name}_${idx}`}
              >{`Skill ${data?.name}: +${data?.level}`}</ListItem>
            )
          )}
          {currentTask.finishRewards.items.map((data: Maybe<ContainedItem>) => (
            <ListItem sx={{ pl: 4 }} key={data?.item.id}>
              <ListItemText>{`${data?.item.name}: ${data?.count}`}</ListItemText>
            </ListItem>
          ))}
          {currentTask.finishRewards.offerUnlock.map(
            (data: Maybe<OfferUnlock>) => (
              <ListItem sx={{ pl: 4 }} key={data?.id}>
                <ListItemText>{`Unlock offer ${data?.item.name} at ${data?.trader.name}.`}</ListItemText>
              </ListItem>
            )
          )}
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
                  {currentTask?.traderLevelRequirements.map(
                    (data: Maybe<RequirementTrader>, idx: number) => (
                      <ListItem
                        sx={{ pl: 4 }}
                        divider
                        key={`${data?.id}_${idx}`}
                      >
                        <ListItemText>{`${data?.trader.name}:Lv.${data?.level}`}</ListItemText>
                      </ListItem>
                    )
                  )}
                  {currentTask?.taskRequirements.map(
                    (data: Maybe<TaskStatusRequirement>) => (
                      <ListItem sx={{ pl: 4 }} divider>
                        <ListItemText>{`${data?.task.name} -> ${data?.status}`}</ListItemText>
                      </ListItem>
                    )
                  )}
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

  return (
    <TableBody>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          component="th"
          scope="row"
          onClick={handleClick}
          sx={{ cursor: "pointer" }}
        >
          <IconButton size="small">
            {listOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {taskData.trader.name}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, maxHeight: 400 }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={1}>
          <Collapse in={listOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, height: 400 }}>
              <DataGrid
                columns={cols}
                rows={taskData.tasks}
                sx={{ cursor: "pointer" }}
                density="compact"
                localeText={localeText}
                initialState={{
                  columns: { columnVisibilityModel: { experience: false } },
                  sorting: defaultSort,
                }}
                onCellClick={(event: any) => handleDialogOpen(event.row)}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DetailDialog />
    </TableBody>
  );
};

export default RowChild;
