import {
  Autocomplete,
  InputAdornment,
  styled,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import { useHooks } from "./hooks";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink } from "react-router-dom";

type props = {
  sx?: SxProps<Theme>;
};

const CustomInputAdornment = styled(InputAdornment)(({ theme }) => ({
  marginRight: theme.spacing(-4), // アイコンの右側のpaddingを調整
}));

export const SearchInput = memo(({ sx }: props) => {
  const { searchItems } = useHooks();
  const [inputValue, setInputValue] = useState<string>("");
  const filteredOptions =
    inputValue !== "" && inputValue.length > 2
      ? [...searchItems.tasks, ...searchItems.items].filter((option) =>
          option.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];
  return (
    <Autocomplete
      options={filteredOptions}
      inputValue={inputValue}
      onInputChange={(_, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
      noOptionsText="3+ char keyword."
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <CustomInputAdornment position="end">
                <SearchIcon />
              </CustomInputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            <Typography
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
              component={RouterLink}
              to={""}
            >
              {option.name}
            </Typography>
          </li>
        );
      }}
      sx={sx}
    />
  );
});
