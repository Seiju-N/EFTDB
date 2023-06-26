import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const UserSearch = () => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        my: 6,
        display: "flex",
        alignItems: "center",
        width: 600,
        height: 64,
        borderRadius: 10,
        bgcolor: "action.disabledBackground",
      }}
      variant="outlined"
    >
      <InputBase
        sx={{ ml: 3, flex: 1, fontSize: "1.3rem" }}
        placeholder="Search Players"
        inputProps={{ "aria-label": "search players" }}
      />
      <IconButton type="button" sx={{ p: "10px", mr: 1 }} aria-label="search">
        <SearchIcon fontSize="large" />
      </IconButton>
    </Paper>
  );
};
