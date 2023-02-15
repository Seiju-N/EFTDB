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

import { Routes, Route } from "react-router-dom";
import Home from "./Home";

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
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:traderName/" element={<TaskList />} />
        <Route path="/item/" element={<ItemList />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
