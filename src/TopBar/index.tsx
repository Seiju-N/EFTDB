import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { SITE_NAME } from "@/constants/CONST_VALUES";
import { DiscordButton } from "./DiscordButton";
import { TitleLogo } from "./TitleLogo";
import { MenuItemsMD } from "./MenuItemsMD";
import { MenuItemsXS } from "./MenuItemsXS";
import { LanguageSelect } from "./LanguageSelect";
import { SearchInput } from "./SearchInput";
import { LanguageCode } from "@/graphql/generated";
import { Box } from "@mui/material";
import { LoginButton } from "./LoginButton";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  setLanguage: React.Dispatch<React.SetStateAction<LanguageCode>>;
};

export const TopBar = ({ setLanguage }: Props) => {
  const { isLogin } = useAuth();
  console.log(isLogin);
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
              flexGrow: 0.1,
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
          <SearchInput />
          <DiscordButton />
          <LanguageSelect setLanguage={setLanguage} />
          <LoginButton />
        </Toolbar>
        <Box textAlign={"center"} bgcolor={"#222"}>
          <Typography variant="overline" color={"#DDD"}>
            画面上部の検索機能は別機能への置き換えのため今後廃止されます。
          </Typography>
        </Box>
      </Container>
    </AppBar>
  );
};
