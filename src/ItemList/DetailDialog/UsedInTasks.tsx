import { memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useHooks } from "./hooks";
import { Item } from "@/graphql/generated";
import { Link as RouterLink } from "react-router-dom";
import TaskIcon from "@mui/icons-material/Task";

type Props = {
  currentItem: Item;
};

export const UsedInTasks = memo(({ currentItem }: Props) => {
  const { flexCenter, ITEM_PROPERTIES } = useHooks();
  if (!currentItem.usedInTasks || currentItem.usedInTasks.length === 0)
    return null;
  return (
    <Grid container spacing={1}>
      <Grid xs={6} sx={flexCenter}>
        <Tooltip title="use in task?">
          <TaskIcon style={{ height: "auto", paddingRight: 4 }} />
        </Tooltip>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {ITEM_PROPERTIES.usedInTasks}
        </Typography>
      </Grid>
      <Grid xs={6}>
        <List>
          {currentItem.usedInTasks.map((task) => (
            <ListItem key={task?.id} disablePadding>
              <ListItemButton
                disableGutters
                component={RouterLink}
                to={`/task/${task?.trader.name}`}
                state={{ taskId: task?.id }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "0.8rem",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  color="text.primary"
                  primary={task?.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
});
