import React from "react";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { LoginButton } from "./LoginButton";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
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
              <ListItemButton disabled>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={langDict.SIDE_MENU.user_setting} />
              </ListItemButton>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={langDict.LOGIN_STATUS.logout} />
              </ListItemButton>
            </List>
            <Box sx={{ mt: "auto" }}>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`${discordUser.username}#${discordUser.discriminator}`}
                  />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
};
