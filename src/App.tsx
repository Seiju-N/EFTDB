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
import { UserPage } from "./UserPage";
import { ITEM_CATEGORIES, TRADERS } from "@/query";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
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

const App = () => {
  const [language, setLanguage] = useState<LanguageCode>(LanguageCode.En);
  const [languageDict, setLanguageDict] = useState<dictType>(EN_DICT);
  const { data: tradersData } = useQuery<Query>(TRADERS);
  const { data: categoryData } = useQuery<Query>(ITEM_CATEGORIES);

  useEffect(() => {
    const storageLang = localStorage.getItem("lang") as LanguageCode;
    storageLang
      ? setLanguage(storageLang)
      : setLanguage(navigator.language as LanguageCode);
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
      <CssBaseline />
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
                <Route path="/user/:userName" element={<UserPage />} />
              </Routes>
              <Footer />
            </TradersContext.Provider>
          </LanguageDictContext.Provider>
        </LanguageContext.Provider>
      </CategoryContext.Provider>
    </ThemeProvider>
  );
};

export default App;
