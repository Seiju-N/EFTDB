import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { Link as RouterLink } from "react-router-dom";
import { useContext, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { SITE_NAME, SUPPORTED_LANG } from "./constants/CONST_VALUES";
import { LanguageDictContext, TradersContext } from "./App";
import { ReactComponent as Discord } from "./img/discord.svg";
import Language from "@mui/icons-material/Language";

type Props = {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const TopBar = (props: Props) => {
  const { setLanguage } = props;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElTask, setAnchorElTask] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(true);
  const langDict = useContext(LanguageDictContext);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenTaskMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTask(event.currentTarget);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseTaskMenu = () => {
    setAnchorElTask(null);
  };
  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleLangClick = (lang: string) => {
    handleCloseLangMenu();
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const traders = useContext(TradersContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to={""}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {SITE_NAME}
          </Typography>

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
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <List>
                <ListItemButton onClick={handleClick}>
                  <ListItemText secondary="TASK" sx={{ pr: 10 }} />
                  {open ? (
                    <ExpandLess fontSize="large" />
                  ) : (
                    <ExpandMore fontSize="large" />
                  )}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {traders.map((trader) => (
                      <ListItem
                        alignItems="flex-start"
                        key={trader.name}
                        disablePadding
                      >
                        <ListItemButton
                          component={RouterLink}
                          to={`task/${trader.name}`}
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt={trader.name}
                              src={trader.imageLink || ""}
                            />
                          </ListItemAvatar>
                          <ListItemText primary={trader.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                <ListItemButton component={RouterLink} to={"item"}>
                  <ListItemText secondary="ITEM"></ListItemText>
                </ListItemButton>
              </List>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to={""}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {SITE_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleOpenTaskMenu}
            >
              task
            </Button>
            <Button
              component={RouterLink}
              to={"item"}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              item
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElTask}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElTask)}
              onClose={handleCloseTaskMenu}
            >
              {traders.map((trader) => (
                <ListItem
                  alignItems="flex-start"
                  key={trader.id}
                  disablePadding
                >
                  <ListItemButton
                    component={RouterLink}
                    to={`task/${trader.name}`}
                  >
                    <ListItemAvatar>
                      <Avatar alt={trader.name} src={trader.imageLink || ""} />
                    </ListItemAvatar>
                    <ListItemText primary={trader.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={langDict.HOME_SENTENCE.discord_server}>
              <IconButton href="https://discord.gg/cjUhFptaxM">
                <Discord height={24} />
              </IconButton>
            </Tooltip>
          </Box>
          <IconButton id="simple-menu" onClick={handleOpenLangMenu}>
            <Language />
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Menu
              id="simple-menu"
              anchorEl={anchorElLang}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
            >
              {SUPPORTED_LANG.map((lang, index) => (
                <MenuItem key={index} onClick={() => handleLangClick(lang)}>
                  {lang}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
