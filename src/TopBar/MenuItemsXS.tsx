import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
} from "@mui/material";
import { useHooks } from "./hooks";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { FlatItem } from "./ItemMenuComponents/FlatItem";
import { NestedSubItem } from "./ItemMenuComponents/NestedSubItem";
import { NestedItem } from "./ItemMenuComponents/NestedItem";

export const MenuItemsXS = () => {
  const {
    taskOpen,
    itemOpen,
    langDict,
    traders,
    anchorElNav,
    handleTaskClick,
    handleItemClick,
    handleOpenNavMenu,
    handleCloseNavMenu,
  } = useHooks();
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <List>
          <ListItemButton onClick={handleTaskClick}>
            <ListItemText
              primary={langDict.MENU_SENTENCE.task}
              sx={{ pr: 10 }}
            />
            {taskOpen ? (
              <ExpandLess fontSize="large" />
            ) : (
              <ExpandMore fontSize="large" />
            )}
          </ListItemButton>
          <Collapse in={taskOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {traders.map((trader) => (
                <ListItem
                  alignItems="flex-start"
                  key={trader?.name}
                  disablePadding
                >
                  <ListItemButton
                    component={RouterLink}
                    to={`task/${trader?.name}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={trader?.name}
                        src={trader?.imageLink || ""}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={trader?.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={handleItemClick}>
            <ListItemText primary={langDict.MENU_SENTENCE.item} />
            {itemOpen ? (
              <ExpandLess fontSize="large" />
            ) : (
              <ExpandMore fontSize="large" />
            )}
          </ListItemButton>
          <Collapse in={itemOpen} timeout="auto" unmountOnExit>
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
          </Collapse>
        </List>
      </Menu>
    </Box>
  );
};
