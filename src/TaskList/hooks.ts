import type { SelectChangeEvent } from "@mui/material/Select";
import type { GridColDef, GridFilterModel, GridSortingInitialState } from "@mui/x-data-grid";
import {  enUS } from "@mui/x-data-grid";
import  { useCallback, useState } from "react";


import type { Task } from "@/graphql/generated";

export const useHooks = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>();
  const [filter, setFilter] = useState<string>("");
  const [taskFilter, setTaskFilter] = useState<GridFilterModel>({
    items: [],
  });

  
const fetchParams = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

  const cols: GridColDef[] = [
    {
      field: "name",
      headerName: "名",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "map",
      headerName: "マップ",
      minWidth: 120,
      flex: 0.6,
      valueGetter: ({ value }) => {
        return value?.name;
      },
    },
    {
      field: "experience",
      headerName: "経験値",
      minWidth: 120,
      flex: 0.4,
    },
    {
      field: "trader",
      headerName: "trader name",
      minWidth: 160,
      flex: 1,
      type:"string",
      valueGetter: ({ value }) => {
        return value?.name;
      },
    },
    {
      field: "kappaRequired",
      headerName: "Kappa",
      minWidth: 40,
      flex: 0.3,
      type:"boolean",
    },
    {
      field: "lightkeeperRequired",
      headerName: "Lightkeeper",
      minWidth: 40,
      flex: 0.3,
      type:"boolean",
    },
  ];


  const handleDialogOpen = (value: Task) => {
    setCurrentTask(value);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const defaultSort: GridSortingInitialState = {
    sortModel: [{ field: "name", sort: "asc" }],
  };

  const localeText = enUS.components.MuiDataGrid.defaultProps.localeText;

  const isAllArrayElementsEmpty = useCallback((obj: any) => {
    return Object.values(obj).every((val: any) => val.length === 0);
  },[]);

  const convertObject = useCallback((name: string) => {
    console.log(name);
    return {
      items: [
        { columnField: name, operatorValue: "is", value: "true" },
      ],
    };
  },[]);
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value: string = event.target.value as string;
    setFilter(value);
    setTaskFilter(convertObject(value));
  };

  return {
    handleDialogOpen,
    handleDialogClose,
    handleChange,
    isAllArrayElementsEmpty,
    setCurrentTask,
    dialogOpen,
    currentTask,
    filter,
    taskFilter,
    cols,
    localeText,
    defaultSort,
    fetchParams
  };
};
