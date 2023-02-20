import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  darkScrollbar,
} from "@mui/material";
import { jaJP } from "@mui/material/locale";

import ItemList from "./ItemList";
import TaskList from "./TaskList";
import TopBar from "./TopBar";
import Home from "./Home";

import { Routes, Route } from "react-router-dom";

import { ItemCategory, LanguageCode, Trader } from "./graphql/generated";
import { createContext, useEffect, useState } from "react";
import { fetchParams } from "./ItemList/utils";
import EN_DICT from "./constants/languages/en";
import JA_DICT from "./constants/languages/ja";
import { DictType } from "./constants/languages/types";

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

const App = () => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [language, setLanguage] = useState("");
  const [languageDict, setLanguageDict] = useState<DictType>(EN_DICT);
  const [category, setCategory] = useState<ItemCategory[]>([]);
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            traders{
              id
              name
              imageLink
            }
          }`,
        }),
      })
        .then((r) => r.json())
        .then(({ data }) => {
          setTraders(data.traders);
        });
    };
    const get_category = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            itemCategories{
              name
              normalizedName
              children{
                name
                normalizedName
              }
              parent{
                name
                normalizedName
              }
            }
          }`,
        }),
      })
        .then((r) => r.json())
        .then(({ data }) => {
          setCategory(data.itemCategories);
        });
    };
    access_api();
    get_category();
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CategoryContext.Provider value={category}>
        <LanguageDictContext.Provider value={languageDict}>
          <TradersContext.Provider value={traders}>
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
