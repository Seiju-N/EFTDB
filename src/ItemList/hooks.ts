import { Item } from "@/api/types";
import { useItems } from "@/api/hooks";
import {  SelectChangeEvent } from "@mui/material";
import type { GridColDef, GridFilterModel, GridSortingInitialState } from "@mui/x-data-grid";
import { enUS } from "@mui/x-data-grid";
import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { LanguageContext, LanguageDictContext } from "@/App";

export const useHooks = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>();
  const [filter, setFilter] = useState<string>("");
  const [ammoTypeFilter, setAmmoTypeFilter] = useState<GridFilterModel>({
    items: [],
  });
  const lang = useContext(LanguageContext);
  const langDict = useContext(LanguageDictContext);
  const localeText = enUS.components.MuiDataGrid.defaultProps.localeText;
  const param = useParams();
  const location = useLocation();
  
  const convertObject = useCallback((ammoType: string) => {
    return {
      items: [
        { columnField: "properties", operatorValue: "equals", value: ammoType },
      ],
    };
  }, []);
  const handleChange = useCallback((event: SelectChangeEvent<string>) => {
    const value: string = event.target.value as string;
    setFilter(value);
    setAmmoTypeFilter(convertObject(value));
  }, []);

  useEffect(() => {
    setFilter("")
    setAmmoTypeFilter({ items: [] })
  }, [param.categoryName]);

  const handleDialogOpen = useCallback((value: Item) => {
    setCurrentItem(value);
    setDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const cols: GridColDef[] = [
    {
      field: "category",
      headerName: "category",
      minWidth: 120,
      flex: 0.4,
      valueGetter: ({ value }) => {
        return value.name;
      },
    },
    {
      field: "name",
      headerName: "name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "properties",
      headerName: "caliber",
      minWidth: 200,
      flex: 1,
      valueGetter: ({ value }) => {
        if (value) {
          return value.caliber;
        } else {
          return "";
        }
      },
    }
  ];

  const defaultSort: GridSortingInitialState = {
    sortModel: [{ field: "category", sort: "asc" }],
  };

  const { loading, error, data } = useItems(lang, param.categoryName);
  const items = data?.items || [];

  return { langDict, param, filter, ammoTypeFilter, localeText, cols, defaultSort, dialogOpen, currentItem, handleChange, handleDialogOpen, handleDialogClose, data, error, loading, items, location }
}
