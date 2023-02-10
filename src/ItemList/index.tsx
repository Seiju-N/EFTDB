import React, { useCallback, useEffect, useState } from "react";

import CurrencyRuble from "@mui/icons-material/CurrencyRuble";
import LanguageIcon from "@mui/icons-material/Language";
import QueryStats from "@mui/icons-material/QueryStats";
import ZoomOutMap from "@mui/icons-material/ZoomOutMap";
import {
  Backdrop,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  DataGrid,
  GridColDef,
  GridSortingInitialState,
  GridToolbarQuickFilter,
  jaJP,
} from "@mui/x-data-grid";

import ItemProperties from "./ItemProperties";
import { fetchParams } from "./utils";
import { ITEM_PROPERTIES } from "../constants/LANG_VALUES";
import { Item, Maybe } from "../graphql/generated";

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>();

  const handleDialogOpen = (value: Item) => {
    setCurrentItem(value);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const localeText = jaJP.components.MuiDataGrid.defaultProps.localeText;

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
  ];

  const defaultSort: GridSortingInitialState = {
    sortModel: [{ field: "category", sort: "asc" }],
  };

  const CustomToolbar = () => {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  };

  const CardContentNoPadding = styled(CardContent)(`
    padding: 16px;
    &:last-child {
      padding-bottom: 16px;
    }
  `);

  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            items{
              id
              name
              normalizedName
              shortName
              category{
                name
              }
              basePrice
              width
              height
              types
              image512pxLink
              wikiLink
              usedInTasks{
                id
                name
              }
              properties{
                __typename
              }
            }
          }`,
        }),
      })
        .then((r) => r.json())
        .then(({ data }) => {
          setItems(data.items);
        });
    };
    access_api();
  }, []);

  const DetailDialog = () => {
    const verticalCenter = { display: "flex", justifyContent: "center" };
    const flexCenter = { display: "flex", alignItems: "center" };

    const handleClick = useCallback((link: Maybe<string> | undefined) => {
      if (!link) return null;
      window.open(link);
    }, []);
    if (!currentItem) return null;
    return (
      <Dialog
        PaperProps={{
          sx: {
            height: "90vh",
          },
        }}
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
      >
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
                      サイズ
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      component="div"
                    >
                      {`幅: ${currentItem.width}   高さ: ${currentItem.height}`}
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
                            <ListItemButton disableGutters>
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
                  <Typography>詳細はありません</Typography>
                )}
              </CardContentNoPadding>
            </Box>
          </Card>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <Box sx={{ margin: 1, height: "90vh" }}>
        <DataGrid
          columns={cols}
          rows={items}
          sx={{ cursor: "pointer" }}
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
        />
      </Box>
      <DetailDialog />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={items.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ItemList;
