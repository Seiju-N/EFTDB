import { Item, Maybe } from "@/graphql/generated";
import { GET_ITEMS } from "@/query";
import { useQuery } from "@apollo/client";
import { CardContent, SelectChangeEvent, styled } from "@mui/material";
import type { GridColDef, GridFilterModel, GridSortingInitialState } from "@mui/x-data-grid";
import { enUS } from "@mui/x-data-grid";
import { SyntheticEvent, useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LanguageDictContext } from "../App";

export const useHooks = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>();
  const [filter, setFilter] = useState<string>("");
  const [priceTrackerSet, setPriceTrackerSet] = useState<Set<string>>(new Set(JSON.parse(localStorage.getItem("PriceTracker") || "[]")));
  const [ammoTypeFilter, setAmmoTypeFilter] = useState<GridFilterModel>({
    items: [],
  });
  const [open, setOpen] = useState<boolean>(false);
  const langDict = useContext(LanguageDictContext);
  const localeText = enUS.components.MuiDataGrid.defaultProps.localeText;
  const param = useParams();

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
      flex: 1,
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

  const CardContentNoPadding = styled(CardContent)(`
    padding: 16px;
    &:last-child {
      padding-bottom: 16px;
    }
  `);

  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: {
      categoryNames: [param.categoryName],
      withCategory: Boolean(param.categoryName),
    },
  });

  const handlePinClick = useCallback((id: string) => {
    if (priceTrackerSet.size >= 5 && !priceTrackerSet.has(id)) {
      setOpen(true);
      return;
    }
    setPriceTrackerSet((prevPriceTrackerSet) => {
      const newData = new Set(prevPriceTrackerSet);
      newData.has(id) ? newData.delete(id) : newData.add(id);
      localStorage.setItem("PriceTracker", JSON.stringify(Array.from(newData)));
      setOpen(true);
      return newData;
    });
  }, []);

  const handleWikiLinkClick = useCallback((link: Maybe<string> | undefined) => {
    if (!link) return null;
    window.open(link);
  }, []);

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return { langDict, param, filter, ammoTypeFilter, localeText, cols, defaultSort, CardContentNoPadding, dialogOpen, currentItem, handleChange, handleDialogOpen, handleDialogClose, data, error, loading, handlePinClick, handleWikiLinkClick, priceTrackerSet, open, handleClose }
}
