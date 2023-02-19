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

import { LanguageCode, Trader } from "./graphql/generated";
import { createContext, useEffect, useState } from "react";
import { fetchParams } from "./ItemList/utils";

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
export const LanguageDictContext = createContext({});

const App = () => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [language, setLanguage] = useState("");
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
    access_api();
    const storageLang = localStorage.getItem("lang");
    storageLang ? setLanguage(storageLang) : setLanguage("en");
  }, []);

  console.log(language);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LanguageDictContext.Provider value={language}>
        <TradersContext.Provider value={traders}>
          <TopBar setLanguage={setLanguage} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task/:traderName/" element={<TaskList />} />
            <Route path="/item/" element={<ItemList />} />
          </Routes>
        </TradersContext.Provider>
      </LanguageDictContext.Provider>
    </ThemeProvider>
  );
};

export default App;
