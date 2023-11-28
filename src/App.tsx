import { useQuery } from "@apollo/client";
import {
  createTheme,
  CssBaseline,
  darkScrollbar,
  ThemeProvider,
} from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import EN_DICT from "./constants/languages/en";
import JA_DICT from "./constants/languages/ja";
import type { dictType } from "./constants/languages/types";
import { Footer } from "./Footer";
import type { ItemCategory, Maybe, Query, Trader } from "./graphql/generated";
import { LanguageCode } from "./graphql/generated";
import { Home } from "./Home";
import { ItemList } from "./ItemList";
import { TaskList } from "./TaskList";
import { TopBar } from "./TopBar";
import { ITEM_CATEGORIES, TRADERS } from "@/query";
import { useTracking } from "./ga/useTracking";
import { Profit } from "./Profit";
import { NotFound } from "./404";
import { AuthCallback } from "./Auth";
import { AuthProvider } from "./contexts/AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "#root": {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        },
        body: {
          ...darkScrollbar(),
          height: "100%",
        },
      },
    },
  },
});

export const TradersContext = createContext<
  readonly Maybe<Trader>[] | undefined
>([]);
export const LanguageDictContext = createContext<dictType>(EN_DICT);
export const LanguageContext = createContext<LanguageCode>(LanguageCode.En);
export const CategoryContext = createContext<
  readonly Maybe<ItemCategory>[] | undefined
>([]);

const SUPPORTED_LANGUAGES = [
  "cs",
  "de",
  "en",
  "es",
  "fr",
  "hu",
  "it",
  "ja",
  "ko",
  "pl",
  "pt",
  "ru",
  "sk",
  "tr",
  "zh",
] as const;

const App = () => {
  const [language, setLanguage] = useState<LanguageCode>(LanguageCode.En);
  const [languageDict, setLanguageDict] = useState<dictType>(EN_DICT);
  const { data: tradersData } = useQuery<Query>(TRADERS);
  const { data: categoryData } = useQuery<Query>(ITEM_CATEGORIES);

  useTracking("G-93Z965NJ8Q");

  useEffect(() => {
    const storageLang = localStorage.getItem("lang") as LanguageCode;
    const isLangValid =
      Object.values(SUPPORTED_LANGUAGES).includes(storageLang);

    if (isLangValid) {
      setLanguage(storageLang);
    } else {
      const browserLang = navigator.language
        .split("-")[0]
        .toLowerCase() as LanguageCode;
      if (Object.values(SUPPORTED_LANGUAGES).includes(browserLang)) {
        setLanguage(browserLang);
      } else {
        setLanguage(LanguageCode.En);
      }
      localStorage.setItem("lang", LanguageCode.En);
    }
  }, []);

  useEffect(() => {
    switch (language) {
      case LanguageCode.En:
        setLanguageDict(EN_DICT);
        break;
      case LanguageCode.Ja:
        setLanguageDict(JA_DICT);
        break;
      default:
        setLanguageDict(EN_DICT);
        setLanguage(LanguageCode.En);
        break;
    }
  }, [language]);
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <CssBaseline />
        <div id="root">
          <CategoryContext.Provider value={categoryData?.itemCategories}>
            <LanguageContext.Provider value={language}>
              <LanguageDictContext.Provider value={languageDict}>
                <TradersContext.Provider value={tradersData?.traders}>
                  <TopBar setLanguage={setLanguage} />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/task/:traderName/" element={<TaskList />} />
                    <Route path="/item/" element={<ItemList />} />
                    <Route path="/item/:categoryName" element={<ItemList />} />
                    <Route path="/profit/" element={<Profit />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </TradersContext.Provider>
              </LanguageDictContext.Provider>
            </LanguageContext.Provider>
          </CategoryContext.Provider>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
