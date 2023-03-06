import CurrencyRuble from "@mui/icons-material/CurrencyRuble";
import LanguageIcon from "@mui/icons-material/Language";
import QueryStats from "@mui/icons-material/QueryStats";
import ZoomOutMap from "@mui/icons-material/ZoomOutMap";
import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { DataGrid } from "@mui/x-data-grid";
import React, { memo, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useHooks } from "./hooks";
import ItemProperties from "./ItemProperties";
import { ITEM_PROPERTIES } from "../constants/LANG_VALUES";
import type { Maybe } from "../graphql/generated";
import { CALIBERS } from "@/constants/CALIBER";

const ItemList = () => {
  const {
    langDict,
    localeText,
    cols,
    defaultSort,
    CardContentNoPadding,
    dialogOpen,
    currentItem,
    param,
    filter,
    ammoTypeFilter,
    handleChange,
    handleDialogOpen,
    handleDialogClose,
    loading,
    error,
    data,
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
        ) : null}
      </Box>
    );
  };

  const items = data?.itemsWithCategories || data?.itemsWithoutCategories || [];
  if (loading || error)
    return (
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="h4" pl={2}>
          Loading...
        </Typography>
      </Box>
    );

  const DetailDialog = () => {
    const verticalCenter = { display: "flex", justifyContent: "center" };
    const flexCenter = { display: "flex", alignItems: "center" };

    const handleClick = useCallback((link: Maybe<string> | undefined) => {
      if (!link) return null;
      window.open(link);
    }, []);
    if (!currentItem) return null;

    const DetailDialogTitle = memo(() => {
      return (
        <Grid container>
          <Grid xs={10}>
            <DialogTitle>{currentItem.name}</DialogTitle>
          </Grid>
          <Grid xs={2} sx={verticalCenter}>
            <IconButton onClick={() => handleClick(currentItem.wikiLink)}>
              <LanguageIcon />
            </IconButton>
          </Grid>
        </Grid>
      );
    });

    return (
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
        <DetailDialogTitle />
        {currentItem.image512pxLink ? (
          <Grid sx={verticalCenter}>
            <img
              style={{ height: 120, width: "auto", maxWidth: "100%" }}
              src={currentItem.image512pxLink}
              alt="Item"
            />
          </Grid>
        ) : null}
        <DialogContent>
          <Card variant="outlined">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContentNoPadding>
                {/* // TODO: 以下コンポーネント切り出し */}
                <Grid container spacing={2}>
                  <Grid xs={6} sx={flexCenter}>
                    <Tooltip title="Size">
                      <ZoomOutMap style={{ height: "auto", paddingRight: 4 }} />
                    </Tooltip>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      {langDict.ITEM_DETAIL_DIALOG.SIZE}
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      component="div"
                    >
                      {`${langDict.ITEM_DETAIL_DIALOG.WIDTH}: ${currentItem.width}   ${langDict.ITEM_DETAIL_DIALOG.HEIGHT}: ${currentItem.height}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid xs={6} sx={flexCenter}>
                    <Tooltip title="Base price">
                      <CurrencyRuble
                        style={{ height: "auto", paddingRight: 4 }}
                      />
                    </Tooltip>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      {ITEM_PROPERTIES.basePrice}
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      component="div"
                    >
                      {`₽ ${currentItem.basePrice}`}
                    </Typography>
                  </Grid>
                </Grid>
                {currentItem.avg24hPrice ? (
                  <Grid container spacing={2}>
                    <Grid xs={6} sx={flexCenter}>
                      <Tooltip title="24h average price">
                        <QueryStats
                          style={{ height: "auto", paddingRight: 4 }}
                        />
                      </Tooltip>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        {ITEM_PROPERTIES.avg24hPrice}
                      </Typography>
                    </Grid>
                    <Grid xs={6}>
                      <Typography
                        variant="subtitle1"
                        color="text.primary"
                        component="div"
                        sx={{ pl: 2 }}
                      >
                        {currentItem.avg24hPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : null}
                {currentItem.usedInTasks.length !== 0 ? (
                  <Grid container spacing={1}>
                    <Grid xs={6} sx={flexCenter}>
                      <Tooltip title="use in task?">
                        <QueryStats
                          style={{ height: "auto", paddingRight: 4 }}
                        />
                      </Tooltip>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        {ITEM_PROPERTIES.usedInTasks}
                      </Typography>
                    </Grid>
                    <Grid xs={6}>
                      <List>
                        {currentItem.usedInTasks.map((task) => (
                          <ListItem key={task?.id} disablePadding>
                            <ListItemButton
                              disableGutters
                              component={RouterLink}
                              to={`/task/${task?.trader.name}`}
                              state={{ taskId: task?.id }}
                            >
                              <ListItemText
                                primaryTypographyProps={{
                                  fontSize: "0.8rem",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                }}
                                color="text.primary"
                                primary={task?.name}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                ) : null}
              </CardContentNoPadding>
            </Box>
          </Card>
          <Card
            variant="outlined"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContentNoPadding>
                {currentItem.properties && currentItem.properties.__typename ? (
                  <ItemProperties
                    typeName={currentItem.properties.__typename}
                    ItemId={currentItem.id}
                  />
                ) : (
                  <Typography>
                    {langDict.ITEM_DETAIL_DIALOG.NO_DETAIL}
                  </Typography>
                )}
              </CardContentNoPadding>
            </Box>
          </Card>
        </DialogContent>
      </Dialog>
    );
  };
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
          filterModel={ammoTypeFilter}
        />
      </Box>
      <DetailDialog />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={items.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default ItemList;
