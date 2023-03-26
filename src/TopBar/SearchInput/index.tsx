import {
  Autocomplete,
  InputAdornment,
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
  const { inputValue, setInputValue, taskData, itemData, isLoading } =
    useHooks();

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

  const searchItems = {
    tasks:
      taskData?.tasks.map((task) => {
        return { id: task.id, name: task.name };
      }) ?? [],
    items:
      itemData?.itemsWithoutCategories.map((item) => {
        return {
          id: item.id,
          name: item.name ? item.name : "",
          categoryName: item.category?.name,
        };
      }) ?? [],
  };

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
          height={Math.min(filteredOptions.length * 40, 300)}
          itemCount={filteredOptions.length}
          itemSize={40}
          itemData={filteredOptions}
          width="100%"
        >
          {ListItem}
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
