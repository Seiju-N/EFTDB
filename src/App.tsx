import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  darkScrollbar,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import { jaJP } from "@mui/material/locale";

import ItemList from "./ItemList";
import TaskList from "./TaskList";
import TopBar from "./TopBar";
import Home from "./Home";

import { Routes, Route } from "react-router-dom";

import { ItemCategory, LanguageCode, Trader } from "./graphql/generated";
import { createContext, useEffect, useState } from "react";
import EN_DICT from "./constants/languages/en";
import JA_DICT from "./constants/languages/ja";
import { DictType } from "./constants/languages/types";
import { gql, useQuery } from "@apollo/client";

const darkTheme = createTheme(
  {
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
  },
  jaJP
);

export const TradersContext = createContext<Trader[]>([]);
export const LanguageDictContext = createContext<DictType>(EN_DICT);
export const CategoryContext = createContext<ItemCategory[]>([]);
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
  const [language, setLanguage] = useState("");
  const [languageDict, setLanguageDict] = useState<DictType>(EN_DICT);
  const {
    loading: tradersIsLoading,
    error: tradersError,
    data: tradersData,
  } = useQuery(TRADERS);
  const {
    loading: categoryIsLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery(ITEM_CATEGORIES);

  useEffect(() => {
    const storageLang = localStorage.getItem("lang");
    storageLang ? setLanguage(storageLang) : setLanguage("en");
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
        break;
    }
  }, [language]);
  if (tradersIsLoading || tradersError || categoryIsLoading || categoryError)
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
        <Typography variant="h4">Loading...</Typography>
      </Backdrop>
    );
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CategoryContext.Provider value={categoryData.itemCategories}>
        <LanguageDictContext.Provider value={languageDict}>
          <TradersContext.Provider value={tradersData.traders}>
            <TopBar setLanguage={setLanguage} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/task/:traderName/" element={<TaskList />} />
              <Route path="/item/" element={<ItemList />} />
              <Route path="/item/:categoryName" element={<ItemList />} />
            </Routes>
          </TradersContext.Provider>
        </LanguageDictContext.Provider>
      </CategoryContext.Provider>
    </ThemeProvider>
  );
};

export default App;
