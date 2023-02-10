import { useState } from "react";

import { GridColDef, GridSortingInitialState, jaJP } from "@mui/x-data-grid";

import { Task } from "@/graphql/generated";

export const useHooks = () => {
  const [listOpen, setListOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>();

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
  ];

  const handleClick = () => {
    setListOpen(!listOpen);
  };

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

  const localeText = jaJP.components.MuiDataGrid.defaultProps.localeText;

  return {
    handleClick,
    handleDialogOpen,
    handleDialogClose,
    listOpen,
    dialogOpen,
    currentTask,
    cols,
    localeText,
    defaultSort,
  };
};
