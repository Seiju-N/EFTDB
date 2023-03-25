import { LanguageContext } from "@/App";
import { Item, Maybe, Task } from "@/graphql/generated";
import { GET_ITEMS, GET_TASKS } from "@/query";
import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";

type taskDataType = {
  tasks: Task[];
};

type itemDataType = {
  itemsWithoutCategories: Item[];
};

type SearchItemsType = {
  tasks: {
    id: Maybe<string> | undefined;
    name: string;
    trader: string;
    type: string;
  }[];
  items: {
    id: string;
    name: string;
    categoryName?: string;
    type: string;
  }[];
};

export const useHooks = () => {
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

  const [searchItems, setSearchItems] = useState<SearchItemsType>({
    tasks: [],
    items: [],
  });

  const isLoading = taskIsLoading || itemIsLoading;

  useEffect(() => {
    if (taskData && itemData && !isLoading) {
      setSearchItems({
        tasks:
          taskData.tasks.map((task) => {
            return { id: task.id, name: task.name, trader: task.trader.name, type: "task" };
          }) ?? [],
        items:
          itemData.itemsWithoutCategories.map((item) => {
            return {
              id: item.id,
              name: item.name ? item.name : "",
              categoryName: item.category?.name,
              type: "item"
            };
          }) ?? [],
      });

    }
    console.log(searchItems)
  }, [taskData, itemData]);
  return { isLoading, searchItems };
};
