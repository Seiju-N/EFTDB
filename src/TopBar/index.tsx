import Language from "@mui/icons-material/Language";

import { MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

import { SITE_NAME, SUPPORTED_LANG } from "@/constants/CONST_VALUES";
import { useHooks } from "./hooks";
import { DiscordButton } from "./DiscordButton";
import { TitleLogo } from "./TitleLogo";
import { MenuItemsMD } from "./MenuItemsMD";
import { MenuItemsXS } from "./MenuItemsXS";

type Props = {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const TopBar = ({ setLanguage }: Props) => {
  const { anchorElLang, handleOpenLangMenu, handleCloseLangMenu } = useHooks();

  const handleLangClick = useCallback(
    (lang: string) => {
      handleCloseLangMenu();
      setLanguage(lang);
      localStorage.setItem("lang", lang);
    },
    [setLanguage, handleCloseLangMenu]
  );

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuItemsXS />
          <TitleLogo />
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
          <MenuItemsMD />
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
