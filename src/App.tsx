import { gql, useQuery } from "@apollo/client";
import {
  Backdrop,
  CircularProgress,
  createTheme,
  CssBaseline,
  darkScrollbar,
  ThemeProvider,
  Typography,
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

export const TradersContext = createContext<readonly Maybe<Trader>[]>([]);
export const LanguageDictContext = createContext<dictType>(EN_DICT);
export const LanguageContext = createContext<LanguageCode>(LanguageCode.En);
export const CategoryContext = createContext<readonly Maybe<ItemCategory>[]>(
  []
);
const TRADERS = gql`
  query traders {
    traders {
      id
      name
      imageLink
    }
  }
`;
const ITEM_CATEGORIES = gql`
  query itemCategories {
    itemCategories {
      name
      normalizedName
      children {
        name
        normalizedName
      }
      parent {
        name
        normalizedName
      }
    }
  }
`;

const App = () => {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [languageDict, setLanguageDict] = useState<dictType>(EN_DICT);
  const { loading: tradersIsLoading, data: tradersData } =
    useQuery<Query>(TRADERS);
  const { loading: categoryIsLoading, data: categoryData } =
    useQuery<Query>(ITEM_CATEGORIES);

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
        setLanguage("en");
        break;
    }
  }, [language]);
  if (tradersIsLoading || !tradersData || categoryIsLoading || !categoryData)
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
        <Typography variant="h4" pl={2}>
          Loading...
        </Typography>
      </Backdrop>
    );
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CategoryContext.Provider value={categoryData.itemCategories}>
        <LanguageContext.Provider value={language}>
          <LanguageDictContext.Provider value={languageDict}>
            <TradersContext.Provider value={tradersData.traders}>
              <TopBar setLanguage={setLanguage} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/task/:traderName/" element={<TaskList />} />
                <Route path="/item/" element={<ItemList />} />
                <Route path="/item/:categoryName" element={<ItemList />} />
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
