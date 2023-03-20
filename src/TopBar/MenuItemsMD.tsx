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

export const MenuItemsMD = () => {
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
        {traders.map((trader) => (
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
        <FlatItem categoryName="Ammo" />
        <FlatItem categoryName="Arm Band" />
        <NestedSubItem categoryName="Armored equipment" />
        <FlatItem categoryName="Backpack" />
        <NestedItem categoryName="Barter item" />
        <FlatItem categoryName="Chest rig" />
        <FlatItem categoryName="Common container" />
        <NestedItem categoryName="Food and drink" />
        <FlatItem categoryName="Headphones" />
        <FlatItem categoryName="Info" />
        <NestedItem categoryName="Key" />
        <FlatItem categoryName="Knife" />
        <FlatItem categoryName="Map" />
        <NestedItem categoryName="Meds" />
        <FlatItem categoryName="Port. container" />
        <FlatItem categoryName="Special item" />
        <FlatItem categoryName="Throwable weapon" />
        <NestedSubItem categoryName="Weapon mod" />
        <NestedItem categoryName="Weapon" />
      </Menu>
    </Box>
  );
};
