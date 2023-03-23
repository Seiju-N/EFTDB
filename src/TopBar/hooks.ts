import { CategoryContext, LanguageContext, LanguageDictContext, TradersContext } from "@/App";
import { Item, Task } from "@/graphql/generated";
import { GET_ITEMS, GET_TASKS } from "@/query";
import { useQuery } from "@apollo/client";
import { useCallback, useContext, useState } from "react";

export const useHooks = () => {
  const [taskOpen, setTaskOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const lang = useContext(LanguageContext);
  const langDict = useContext(LanguageDictContext);
  const categories = useContext(CategoryContext);
  const traders = useContext(TradersContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElTask, setAnchorElTask] = useState<null | HTMLElement>(null);
  const [anchorElItem, setAnchorElItem] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  type taskDataType = {
    tasks: Task[];
  }

  type itemDataType = {
    itemsWithoutCategories: Item[];
  }

  const { data: taskData } = useQuery<taskDataType>(GET_TASKS, {
    variables: { lang },
  });
  const { data: itemData } = useQuery<itemDataType>(GET_ITEMS, {
    variables: { categoryNames: [], withCategory: false },
  });
  const searchItems = {
    tasks: taskData?.tasks.map((task) => { return { id: task.id, name: task.name } }) ?? [],
    items: itemData?.itemsWithoutCategories.map((item) => {
      return { id: item.id, name: item.name ? item.name : "", categoryName: item.category?.name }
    }) ?? [],
  };
  console.log(searchItems);

  const handleTaskClick = useCallback(() => {
    setTaskOpen(!taskOpen);
  }, [taskOpen]);

  const handleItemClick = useCallback(() => {
    setItemOpen(!itemOpen);
  }, [itemOpen]);


  const handleOpenTaskMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElTask(event.currentTarget);
    },
    []
  );

  const handleCloseTaskMenu = useCallback(() => {
    setAnchorElTask(null);
  }, []);

  const handleOpenItemMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElItem(event.currentTarget);
    },
    []
  );

  const handleCloseItemMenu = useCallback(() => {
    setAnchorElItem(null);
  }, []);

  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    []
  );
  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleOpenLangMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElLang(event.currentTarget);
    },
    []
  );

  const handleCloseLangMenu = useCallback(() => {
    setAnchorElLang(null);
  }, []);

  return {
    taskOpen,
    itemOpen,
    langDict,
    categories,
    traders,
    searchItems,
    anchorElNav,
    anchorElTask,
    anchorElItem,
    anchorElLang,
    setAnchorElTask,
    setAnchorElItem,
    setAnchorElLang,
    handleTaskClick,
    handleItemClick,
    handleOpenTaskMenu,
    handleCloseTaskMenu,
    handleOpenItemMenu,
    handleCloseItemMenu,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleOpenLangMenu,
    handleCloseLangMenu,
  }
}