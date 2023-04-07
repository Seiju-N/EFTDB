import { SUPPORTED_LANG } from "@/constants/CONST_VALUES";
import Language from "@mui/icons-material/Language";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { memo, useCallback } from "react";
import { useHooks } from "./hooks";
import { LanguageCode } from "@/graphql/generated";

type props = {
  setLanguage: React.Dispatch<React.SetStateAction<LanguageCode>>;
};

export const LanguageSelect = memo(({ setLanguage }: props) => {
  const { anchorElLang, handleOpenLangMenu, handleCloseLangMenu } = useHooks();
  const handleLangClick = useCallback(
    (lang: LanguageCode) => {
      handleCloseLangMenu();
      setLanguage(lang);
      localStorage.setItem("lang", lang);
    },
    [setLanguage, handleCloseLangMenu]
  );
  return (
    <>
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
    </>
  );
});
