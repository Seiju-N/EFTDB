import React from "react";
import { useAuth } from "@/contexts/AuthContext";
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
  const { isLogin, discordUser } = useAuth();
  const { handleLogout, drawerOpen, setDrawerOpen } = useHooks();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

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
                <ListItemText primary="ログアウト" />
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
