import { LanguageContext } from "@/App";
import { Item, Task } from "@/graphql/generated";
import { GET_ITEMS, GET_TASKS } from "@/query";
import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";

type taskDataType = {
  tasks: Task[];
};

type itemDataType = {
  itemsWithoutCategories: Item[];
};

export const useHooks = () => {
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
  const isLoading = taskIsLoading || itemIsLoading;

  return { inputValue, setInputValue, searchItems, isLoading }
}
