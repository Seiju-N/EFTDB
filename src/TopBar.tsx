import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Language from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
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
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { CategoryContext, LanguageDictContext, TradersContext } from "./App";
import { SITE_NAME, SUPPORTED_LANG } from "./constants/CONST_VALUES";
import type { ItemCategory, Maybe } from "./graphql/generated";
import { ReactComponent as Discord } from "./img/discord.svg";
import { toPascalCase } from "./utils";

type Props = {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const TopBar = (props: Props) => {
  const { setLanguage } = props;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElTask, setAnchorElTask] = useState<null | HTMLElement>(null);
  const [anchorElItem, setAnchorElItem] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const langDict = useContext(LanguageDictContext);

  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    []
  );

  const handleOpenTaskMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElTask(event.currentTarget);
    },
    []
  );

  const handleOpenItemMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElItem(event.currentTarget);
    },
    []
  );

  const handleOpenLangMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElLang(event.currentTarget);
    },
    []
  );

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseTaskMenu = useCallback(() => {
    setAnchorElTask(null);
  }, []);

  const handleCloseItemMenu = useCallback(() => {
    setAnchorElItem(null);
  }, []);

  const handleCloseLangMenu = useCallback(() => {
    setAnchorElLang(null);
  }, []);

  const handleLangClick = useCallback(
    (lang: string) => {
      handleCloseLangMenu();
      setLanguage(lang);
      localStorage.setItem("lang", lang);
    },
    [setLanguage, handleCloseLangMenu]
  );

  const LogoMd = () => {
    return (
      <>
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
      </>
    );
  };

  const traders = useContext(TradersContext);
  const itemCategories = useContext<readonly Maybe<ItemCategory>[]>(
    CategoryContext
  )
    .filter(
      (category) =>
        category?.name === "Ammo" ||
        category?.name === "Armored equipment" ||
        category?.name === "Arm Band" ||
        category?.name === "Backpack" ||
        category?.name === "Barter item" ||
        category?.name === "Chest rig" ||
        category?.name === "Common container" ||
        category?.name === "Food and drink" ||
        category?.name === "Info" ||
        category?.name === "Headphones" ||
        category?.name === "Key" ||
        category?.name === "Knife" ||
        category?.name === "Map" ||
        category?.name === "Meds" ||
        category?.name === "Port. container" ||
        category?.name === "Throwable weapon" ||
        category?.name === "Weapon mod" ||
        category?.name === "Weapon"
    )
    .sort((a, b) => {
      if (!a || !b) return 0;
      return a.name < b.name ? -1 : 1;
    });

  const DiscordButton = () => {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={langDict.HOME_SENTENCE.discord_server}>
          <IconButton href="https://discord.gg/cjUhFptaxM">
            <Discord height={24} />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoMd />
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
                <ListItemButton onClick={handleClick}>
                  <ListItemText
                    secondary={langDict.MENU_SENTENCE.task}
                    sx={{ pr: 10 }}
                  />
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
                <ListItemButton component={RouterLink} to={"item"}>
                  <ListItemText
                    secondary={langDict.MENU_SENTENCE.item}
                  ></ListItemText>
                </ListItemButton>
              </List>
            </Menu>
          </Box>
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
                <ListItem
                  alignItems="flex-start"
                  key={trader?.id}
                  disablePadding
                >
                  <ListItemButton
                    component={RouterLink}
                    to={`task/${trader?.name}`}
                    onClick={handleCloseTaskMenu}
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
              {itemCategories.map((itemCategory, idx) => (
                <ListItem
                  alignItems="flex-start"
                  key={`${itemCategory?.id}_${idx}`}
                  disablePadding
                >
                  <ListItemButton
                    component={RouterLink}
                    to={`item/${toPascalCase(itemCategory?.name)}`}
                    onClick={handleCloseItemMenu}
                  >
                    <ListItemText
                      primary={
                        langDict.ITEM_CATEGORY_NAME[
                          toPascalCase(itemCategory?.name)
                        ]
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </Menu>
          </Box>
          <DiscordButton />
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
