import { useCallback, useContext, useState } from "react";

import { GridColDef, GridFilterModel, GridSortingInitialState } from "@mui/x-data-grid";

import { Task, TaskRewards } from "@/graphql/generated";
import { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "@apollo/client";
import { CategoryContext, LanguageContext, LanguageDictContext } from "@/App";
import { GET_TASKS } from "@/query";
import { useLocation } from "react-router-dom";

export const useHooks = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>();
  const [filter, setFilter] = useState<string>("");
  const [taskFilter, setTaskFilter] = useState<GridFilterModel>({
    items: [],
  });
  const lang = useContext(LanguageContext);
  const langDict = useContext(LanguageDictContext);
  const categories = useContext(CategoryContext);
  const cols: GridColDef[] = [
    {
      field: "name",
      headerName: langDict.TASK_COLUMN.Name,
      minWidth: 160,
      flex: 1,
    },
    {
      field: "map",
      headerName: langDict.TASK_COLUMN.Map,
      minWidth: 120,
      flex: 0.6,
      valueGetter: ({ value }) => {
        return value?.name;
      },
    },
    {
      field: "experience",
      headerName: langDict.TASK_COLUMN.Experience,
      minWidth: 120,
      flex: 0.4,
    },
    {
      field: "trader",
      headerName: langDict.TASK_COLUMN.TraderName,
      minWidth: 160,
      flex: 1,
      type: "string",
      valueGetter: ({ value }) => {
        return value?.name;
      },
    },
    {
      field: "kappaRequired",
      headerName: langDict.TASK_COLUMN.KappaRequired,
      minWidth: 40,
      flex: 0.3,
      type: "boolean",
    },
    {
      field: "lightkeeperRequired",
      headerName: langDict.TASK_COLUMN.LightkeeperRequired,
      minWidth: 40,
      flex: 0.3,
      type: "boolean",
    },
  ];

  const location = useLocation();

  const handleDialogOpen = useCallback((value: Task) => {
    setCurrentTask(value);
    setDialogOpen(true);
  }, [])

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    window.history.replaceState({}, document.title);
  }, []);

  const defaultSort: GridSortingInitialState = {
    sortModel: [{ field: "name", sort: "asc" }],
  };

  const isAllArrayElementsEmpty = useCallback((obj: TaskRewards) => {
    const { __typename, ...newObj } = obj
    return Object.values(newObj).every((val) => val.length === 0);
  }, []);

  const convertObject = useCallback((name: string) => {
    return {
      items: [
        { columnField: name, operatorValue: "is", value: "true" },
      ],
    };
  }, []);
  const handleChange = useCallback((event: SelectChangeEvent<string>) => {
    const value: string = event.target.value as string;
    setFilter(value);
    setTaskFilter(convertObject(value));
  }, []);

  const { data: taskData, loading } = useQuery(GET_TASKS(lang));

  return {
    handleDialogOpen,
    handleDialogClose,
    handleChange,
    isAllArrayElementsEmpty,
    setCurrentTask,
    lang,
    langDict,
    categories,
    dialogOpen,
    currentTask,
    filter,
    taskFilter,
    cols,
    defaultSort,
    taskData,
    loading,
    location
  };
};
