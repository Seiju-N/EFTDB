import { Item, LanguageCode, Maybe, Task } from "@/graphql/generated";
import { GET_ITEMS, GET_TASKS } from "@/query";
import { toPascalCase } from "@/utils";
import { useQuery } from "@apollo/client";
import { debounce } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";

type taskDataType = {
  tasks: Task[];
};

type itemDataType = {
  itemsWithoutCategories: Item[];
};


export type searchResult = {
  id: Maybe<string> | undefined;
  name: string;
  type: string;
  categoryName?: string;
  trader?: string;
};

export const useHooks = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<searchResult[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const { data: taskData, loading: taskIsLoading } = useQuery<taskDataType>(GET_TASKS(LanguageCode.En));
  const { data: itemData, loading: itemIsLoading } = useQuery<itemDataType>(
    GET_ITEMS(LanguageCode.En),
    {
      variables: { categoryNames: [], withCategory: false },
    }
  );

  const isLoading = taskIsLoading || itemIsLoading;

  const searchItems = useMemo(() => {
    const tasks =
      taskData?.tasks.map((task) => {
        return { id: task.id, name: task.name, trader: task.trader.name ,type: "task" };
      }) ?? [];
    const items =
      itemData?.itemsWithoutCategories.map((item) => {
        return {
          id: item.id,
          name: item.name ? item.name : "",
          categoryName: item.category?.normalizedName,
          type: "item",
        };
      }) ?? [];
    return { tasks, items };
  }, [taskData, itemData]);
  const filteredOptions = useMemo(() => [...searchItems.tasks, ...searchItems.items], [searchItems]);
  const debouncedSearch = debounce((searchValue: string) => {
    const filteredResults = filteredOptions.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setResults(filteredResults);
  }, 500);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setAnchorEl(event.currentTarget);
    setInputValue(searchValue);
  
    if (searchValue) {
      debouncedSearch(searchValue);
    } else {
      setResults([]);
    }
  };
  const generateLink = (rowLink:searchResult) => {
    if (rowLink.type === "task") {
      return `/task/${rowLink.trader}`;
    } else {
      return `/item/${toPascalCase(rowLink.categoryName)}`;
    }
  }

  const generateState = (rowState:searchResult) => {
    if (rowState.type === "task") {
      return {taskId: rowState.id};
    } else {
      return {itemId: rowState.id};
    }
  }
  return { inputValue, results, anchorEl, isLoading, setResults, setInputValue, handleChange, generateLink,generateState }
}
