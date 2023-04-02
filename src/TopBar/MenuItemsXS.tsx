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
                    onClick={handleCloseNavMenu}
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
            <FlatItem categoryName="Ammo" handleClose={handleCloseNavMenu} />
            <FlatItem
              categoryName="Arm Band"
              handleClose={handleCloseNavMenu}
            />
            <NestedSubItem
              categoryName="Armored equipment"
              handleClose={handleCloseNavMenu}
            />
            <FlatItem
              categoryName="Backpack"
              handleClose={handleCloseNavMenu}
            />
            <NestedItem
              categoryName="Barter item"
              handleClose={handleCloseNavMenu}
            />
            <FlatItem
              categoryName="Chest rig"
              handleClose={handleCloseNavMenu}
            />
            <FlatItem
              categoryName="Common container"
              handleClose={handleCloseNavMenu}
            />
            <NestedItem
              categoryName="Food and drink"
              handleClose={handleCloseNavMenu}
            />
            <FlatItem
              categoryName="Headphones"
              handleClose={handleCloseNavMenu}
            />
            <FlatItem categoryName="Info" handleClose={handleCloseNavMenu} />
            <NestedItem categoryName="Key" handleClose={handleCloseNavMenu} />
            <FlatItem categoryName="Knife" handleClose={handleCloseNavMenu} />
            <FlatItem categoryName="Map" handleClose={handleCloseNavMenu} />
            <NestedItem categoryName="Meds" handleClose={handleCloseNavMenu} />
            <FlatItem
              categoryName="Port. container"
              handleClose={handleCloseNavMenu}
            />
            <FlatItem
              categoryName="Special item"
              handleClose={handleCloseNavMenu}
            />
            <FlatItem
              categoryName="Throwable weapon"
              handleClose={handleCloseNavMenu}
            />
            <NestedSubItem
              categoryName="Weapon mod"
              handleClose={handleCloseNavMenu}
            />
            <NestedItem
              categoryName="Weapon"
              handleClose={handleCloseNavMenu}
            />
          </Collapse>
        </List>
      </Menu>
    </Box>
  );
};
