import { dictType } from "@/constants/languages/types";
import { Task } from "@/api/types";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  currentTask: Task;
  langDict: dictType;
  // When provided (e.g. from TaskMap), clicking a required task switches the
  // current modal to that task instead of navigating to the Task List page.
  onTaskSelect?: (taskId: string) => void;
};

export const Requirements = ({ currentTask, langDict, onTaskSelect }: Props) => {
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
        {taskRequirements.map((data) => {
          const label = `${data?.task.name} ${
            data?.status ? langDict.TASK_STATUS[data.status] ?? data.status : ""
          }`;
          return (
            <ListItem sx={{ pl: 2 }} key={data?.task.id} disableGutters>
              {onTaskSelect ? (
                <ListItemButton
                  onClick={() => data?.task?.id && onTaskSelect(data.task.id)}
                >
                  <ListItemText>{label}</ListItemText>
                  <ListItemIcon sx={{ minWidth: "auto" }}>
                    <SyncAltIcon
                      fontSize="small"
                      titleAccess={langDict.TASK_DETAIL_DIALOG.SwitchToThisTask}
                    />
                  </ListItemIcon>
                </ListItemButton>
              ) : (
                <ListItemButton
                  component={RouterLink}
                  to={`/task/${data?.task.trader.name}`}
                  state={{ taskId: data?.task?.id }}
                >
                  <ListItemText>{label}</ListItemText>
                  <ListItemIcon sx={{ minWidth: "auto" }}>
                    <OpenInNewIcon
                      fontSize="small"
                      titleAccess={langDict.TASK_DETAIL_DIALOG.OpenTaskPage}
                    />
                  </ListItemIcon>
                </ListItemButton>
              )}
            </ListItem>
          );
        })}
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
