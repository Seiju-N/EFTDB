import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useHooks } from "./hooks";
import type { Item } from "../graphql/generated";
import { CALIBERS } from "@/constants/CALIBER";
import { Loading } from "./Loading";
import { DetailDialog } from "./DetailDialog";

export const ItemList = () => {
  const {
    currentItem,
    localeText,
    cols,
    defaultSort,
    param,
    filter,
    ammoTypeFilter,
    dialogOpen,
    handleChange,
    handleDialogOpen,
    handleDialogClose,
    loading,
    error,
    data,
    cashOffers,
  } = useHooks();

  const CustomToolbar = () => {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        {param.categoryName === "Ammo" ? (
          <>
            <FormControl
              sx={{ m: 1, minWidth: 120, height: "100%" }}
              size="small"
            >
              <InputLabel shrink id="select-trader">
                Filter
              </InputLabel>
              <Select
                id="select-trader"
                displayEmpty
                value={filter}
                onChange={handleChange}
              >
                <MenuItem value={""}>None</MenuItem>
                {CALIBERS.map((caliber) => (
                  <MenuItem
                    value={caliber.caliberName}
                    key={caliber.caliberName}
                  >
                    {caliber.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        ) : (
          <GridToolbarQuickFilter />
        )}
      </Box>
    );
  };

  const location = useLocation();
  const items = data?.itemsWithCategories || data?.itemsWithoutCategories || [];
  useEffect(() => {
    if (!location.state || !location.state.itemId || !items) return;
    const temp = items.find((item: Item) => item.id === location.state.itemId);
    if (!temp) return;
    handleDialogOpen(temp);
    window.history.replaceState({}, document.title);
  }, [location, data]);

  if (loading || error) return <Loading />;

  return (
    <Container sx={{ height: "100%" }}>
      <Box sx={{ margin: 1, height: "90vh" }}>
        <DataGrid
          columns={cols}
          rows={items}
          sx={{ cursor: "pointer" }}
          columnVisibilityModel={{
            properties: false,
          }}
          density="compact"
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableSelectionOnClick
          localeText={localeText}
          initialState={{
            sorting: defaultSort,
          }}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          onCellClick={(event) => handleDialogOpen(event.row)}
          filterModel={
            param.categoryName === "Ammo" ? ammoTypeFilter : undefined
          }
        />
      </Box>
      <DetailDialog
        currentItem={currentItem}
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        cashOffers={cashOffers?.traders || []}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={items.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};
