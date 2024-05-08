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

export const SideDrawer = () => {
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
            <List sx={{ width: 250 }}>
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
                  <ListItemIcon>
                    <Avatar
                      alt={discordUser.username}
                      src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${discordUser.username}`}
                    secondary={`${discordUser.global_name}`}
                    primaryTypographyProps={{ letterSpacing: 0.2 }}
                    secondaryTypographyProps={{ letterSpacing: 0.2 }}
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
