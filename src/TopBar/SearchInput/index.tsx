import React, { CSSProperties } from "react";
import {
  CircularProgress,
  InputAdornment,
  ListItem,
  ListItemProps,
  ListItemText,
  Paper,
  Popper,
  styled,
  TextField,
} from "@mui/material";
import { FixedSizeList as List } from "react-window";
import { searchResult, useHooks } from "./hooks";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const SearchInput = () => {
  const {
    inputValue,
    results,
    isLoading,
    anchorEl,
    setInputValue,
    setResults,
    handleChange,
    generateLink,
    generateState,
  } = useHooks();

  const clearInputValue = () => {
    setInputValue("");
    setResults([]);
  };

  const Row = ({
    data,
    index,
    style,
  }: ListItemProps<
    "div",
    { data: searchResult[]; index: number; style: CSSProperties }
  >) => {
    const item = data[index];
    return (
      <ListItem
        style={style}
        key={index}
        component={RouterLink}
        to={generateLink(item)}
        onClick={clearInputValue}
        state={generateState(item)}
      >
        <StyledListItemText primary={item.name} />
      </ListItem>
    );
  };

  return (
    <div>
      <TextField
        label={isLoading ? "Loading..." : "Search"}
        variant="standard"
        value={inputValue}
        onChange={handleChange}
        disabled={isLoading}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {isLoading ? <CircularProgress size={24} /> : <SearchIcon />}
            </InputAdornment>
          ),
        }}
      />
      <Popper
        open={!!results.length}
        anchorEl={anchorEl}
        placement="bottom"
        sx={{ zIndex: 20000 }}
      >
        <Paper sx={{ minWidth: "300px" }}>
          <List
            height={Math.min(400, results.length * 50)}
            itemCount={results.length}
            itemSize={50}
            width="100%"
            itemData={results}
          >
            {Row}
          </List>
        </Paper>
      </Popper>
    </div>
  );
};
