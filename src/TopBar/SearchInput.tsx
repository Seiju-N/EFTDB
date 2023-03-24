import {
  Autocomplete,
  InputAdornment,
  styled,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { memo, useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Item, Task } from "@/graphql/generated";
import { useQuery } from "@apollo/client";
import { GET_ITEMS, GET_TASKS } from "@/query";
import { LanguageContext } from "@/App";

type props = {
  sx?: SxProps<Theme>;
};

type taskDataType = {
  tasks: Task[];
};

type itemDataType = {
  itemsWithoutCategories: Item[];
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
  const [inputValue, setInputValue] = useState<string>("");
  const lang = useContext(LanguageContext);
  const { data: taskData, loading: taskIsLoading } = useQuery<taskDataType>(
    GET_TASKS,
    {
      variables: { lang },
    }
  );
  const { data: itemData, loading: itemIsLoading } = useQuery<itemDataType>(
    GET_ITEMS,
    {
      variables: { categoryNames: [], withCategory: false },
    }
  );

  const isLoading = taskIsLoading || itemIsLoading;
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
