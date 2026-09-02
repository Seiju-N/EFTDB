import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";

import { useHooks } from "./hooks";
import type { Item } from "@/api/types";
import { Loading } from "./Loading";
import { DetailDialog } from "./DetailDialog";
import { DataGrid } from "@/components/DataGrid";
import { CustomToolbar } from "./CustomToolbar";

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
    items,
    location,
  } = useHooks();

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
              param,
              filter,
              handleChange,
            },
          }}
          onRowClick={(event) => handleDialogOpen(event.row)}
          filterModel={
            param.categoryName === "Ammo" ? ammoTypeFilter : undefined
          }
        />
      </Box>
      <DetailDialog
        currentItem={currentItem}
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </Container>
  );
};
