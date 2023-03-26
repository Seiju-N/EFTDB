import {
  Autocomplete,
  InputAdornment,
  ListItem,
  styled,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { forwardRef, memo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useHooks } from "./hooks";

type props = {
  sx?: SxProps<Theme>;
};

const CustomInputAdornment = styled(InputAdornment)(({ theme }) => ({
  marginRight: theme.spacing(-4),
}));

const CustomListItem = ({ index, data }: ListChildComponentProps) => {
  const option = data[index];
  // const link = (() => {
  //   if (option.type === "item") {
  //     return toPascalCase(option.categoryName);
  //   } else if (option.type === "task") {
  //     return toPascalCase(option.trader);
  //   }
  //   return "";
  // })();
  return (
    <ListItem key={option.id}>
      <Typography
        sx={{
          color: "inherit",
          textDecoration: "none",
        }}
        component={RouterLink}
        to={"link"}
      >
        {option.name}
      </Typography>
    </ListItem>
  );
};

export const SearchInput = memo(({ sx }: props) => {
  const { inputValue, setInputValue, searchItems, isLoading } = useHooks();

  if (isLoading) {
    return (
      <Autocomplete
        disabled
        options={[]}
        inputValue={inputValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Loading..."
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
  }

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
      ListboxComponent={forwardRef(() => (
        <FixedSizeList
          height={400}
          itemCount={filteredOptions.length}
          itemSize={40}
          itemData={filteredOptions}
          width="100%"
        >
          {CustomListItem}
        </FixedSizeList>
      ))}
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
