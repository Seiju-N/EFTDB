import { dictType } from "@/constants/languages/types";
import { Task } from "@/graphql/generated";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  currentTask: Task;
  langDict: dictType;
};

export const Requirements = ({ currentTask, langDict }: Props) => {
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
