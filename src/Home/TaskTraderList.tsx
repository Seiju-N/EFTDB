import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useHooks } from "./hooks";
import { memo } from "react";

export const TaskTraderList = memo(() => {
  const { langDict, traders, MenuTitle } = useHooks();
  return (
    <Card>
      <MenuTitle
        titleStr={langDict.HOME_SENTENCE.search_task}
        isLoading={traders.length === 0}
      />
      <List component="div">
        {traders.map((trader) => (
          <ListItem alignItems="flex-start" key={trader?.name}>
            <ListItemButton component={RouterLink} to={`task/${trader?.name}`}>
              <ListItemAvatar>
                <Avatar alt={trader?.name} src={trader?.imageLink || ""} />
              </ListItemAvatar>
              <ListItemText
                primary={trader?.name}
                primaryTypographyProps={{ fontSize: "1.4rem" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
});
