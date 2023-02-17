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

import { Trader } from "./graphql/generated";
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

function App() {
  const [traders, setTraders] = useState<Trader[]>([]);
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            traders{
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
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TradersContext.Provider value={traders}>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:traderName/" element={<TaskList />} />
          <Route path="/item/" element={<ItemList />} />
        </Routes>
      </TradersContext.Provider>
    </ThemeProvider>
  );
}

export default App;
