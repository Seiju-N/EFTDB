import React from "react";
import {
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { LoginButton } from "./LoginButton";
import Logout from "@mui/icons-material/Logout";
import { useHooks } from "./hooks";

export const User = () => {
  const {
    handleLogout,
    drawerOpen,
    langDict,
    discordUser,
    isLogin,
    toggleDrawer,
  } = useHooks();

  return (
    <>
      {isLogin && discordUser ? (
        <>
          <IconButton onClick={toggleDrawer(true)}>
            <Avatar
              alt={discordUser.username}
              src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`}
            />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <List>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={langDict.LOGIN_STATUS.logout} />
              </ListItemButton>
            </List>
          </Drawer>
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
};
