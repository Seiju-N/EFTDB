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
import { FixedSizeList, ListChildComponentProps } from "react-window";

type props = {
  sx?: SxProps<Theme>;
};

const CustomInputAdornment = styled(InputAdornment)(({ theme }) => ({
  marginRight: theme.spacing(-4),
}));

const ListItem = ({ index, style, data }: ListChildComponentProps) => {
  const option = data[index];

  return (
    <div style={style} key={option.id}>
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
    </div>
  );
};

export const SearchInput = memo(({ sx }: props) => {
  const { searchItems, isLoading } = useHooks();
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
      disabled={isLoading}
      inputValue={inputValue}
      onInputChange={(_, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
      noOptionsText="3+ char keyword."
      getOptionLabel={(option) => option.name}
      ListboxComponent={() => (
        <FixedSizeList
          height={Math.min(filteredOptions.length * 40, 300)}
          itemCount={filteredOptions.length}
          itemSize={40}
          itemData={filteredOptions}
          width="100%"
        >
          {ListItem}
        </FixedSizeList>
      )}
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
      sx={sx}
    />
  );
});
