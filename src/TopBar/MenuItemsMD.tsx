import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
} from "@mui/material";
import { FlatItem } from "./ItemMenuComponents/FlatItem";
import { useHooks } from "./hooks";
import { Link as RouterLink } from "react-router-dom";
import { NestedItem } from "./ItemMenuComponents/NestedItem";
import { NestedSubItem } from "./ItemMenuComponents/NestedSubItem";
import { useAuth } from "@/contexts/AuthContext";
import { memo } from "react";

export const MenuItemsMD = memo(() => {
  const {
    langDict,
    traders,
    anchorElTask,
    anchorElItem,
    handleOpenTaskMenu,
    handleCloseTaskMenu,
    handleOpenItemMenu,
    handleCloseItemMenu,
  } = useHooks();
  const { isLogin } = useAuth();
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      <Button
        sx={{ my: 2, color: "white", display: "block" }}
        onClick={handleOpenTaskMenu}
      >
        {langDict.MENU_SENTENCE.task}
      </Button>
      <Button
        onClick={handleOpenItemMenu}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {langDict.MENU_SENTENCE.item}
      </Button>
      <Button
        component={RouterLink}
        to={"/profit/"}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {langDict.MENU_SENTENCE.profit}
      </Button>
      {isLogin && (
        <Button
          component={RouterLink}
          to={"/taskmap/"}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {langDict.MENU_SENTENCE.taskMap}
        </Button>
      )}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElTask}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={Boolean(anchorElTask)}
        onClose={handleCloseTaskMenu}
      >
        {traders?.map((trader) => (
          <ListItem alignItems="flex-start" key={trader?.id} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={`task/${trader?.name}`}
              onClick={handleCloseTaskMenu}
            >
              <ListItemAvatar>
                <Avatar alt={trader?.name} src={trader?.imageLink || ""} />
              </ListItemAvatar>
              <ListItemText primary={trader?.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </Menu>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElItem}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={Boolean(anchorElItem)}
        onClose={handleCloseItemMenu}
      >
        <FlatItem categoryName="Ammo" handleClose={handleCloseItemMenu} />
        <FlatItem categoryName="Arm Band" handleClose={handleCloseItemMenu} />
        <NestedSubItem
          categoryName="Armored equipment"
          handleClose={handleCloseItemMenu}
        />
        <FlatItem categoryName="Backpack" handleClose={handleCloseItemMenu} />
        <NestedItem
          categoryName="Barter item"
          handleClose={handleCloseItemMenu}
        />
        <FlatItem categoryName="Chest rig" handleClose={handleCloseItemMenu} />
        <FlatItem
          categoryName="Common container"
          handleClose={handleCloseItemMenu}
        />
        <NestedItem
          categoryName="Food and drink"
          handleClose={handleCloseItemMenu}
        />
        <FlatItem categoryName="Headphones" handleClose={handleCloseItemMenu} />
        <FlatItem categoryName="Info" handleClose={handleCloseItemMenu} />
        <NestedItem categoryName="Key" handleClose={handleCloseItemMenu} />
        <FlatItem categoryName="Knife" handleClose={handleCloseItemMenu} />
        <FlatItem categoryName="Map" handleClose={handleCloseItemMenu} />
        <NestedItem categoryName="Meds" handleClose={handleCloseItemMenu} />
        <FlatItem
          categoryName="Port. container"
          handleClose={handleCloseItemMenu}
        />
        <FlatItem
          categoryName="Special item"
          handleClose={handleCloseItemMenu}
        />
        <FlatItem
          categoryName="Throwable weapon"
          handleClose={handleCloseItemMenu}
        />
        <NestedSubItem
          categoryName="Weapon mod"
          handleClose={handleCloseItemMenu}
        />
        <NestedItem categoryName="Weapon" handleClose={handleCloseItemMenu} />
      </Menu>
    </Box>
  );
});
