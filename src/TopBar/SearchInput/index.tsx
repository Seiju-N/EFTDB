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

const CustomListItem = ({ index, style, data }: ListChildComponentProps) => {
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
  const { inputValue, setInputValue, filteredOptions, isLoading } = useHooks();

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
