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
    langDict,
    currentItem,
    localeText,
    cols,
    defaultSort,
    param,
    filter,
    open,
    ammoTypeFilter,
    dialogOpen,
    handleWikiLinkClick,
    handlePinClick,
    handleChange,
    handleDialogOpen,
    handleDialogClose,
    handleClose,
    priceTrackerSet,
    loading,
    error,
    data,
    DEFAULT_ITEMS_COUNT_LIMIT,
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

  // const DetailDialog = () => {
  //   const { ITEM_PROPERTIES } = useContext(LanguageDictContext);
  //   const {
  //     langDict,
  //     handleWikiLinkClick,
  //     handlePinClick,
  //     priceTrackerSet,
  //     open,
  //     handleClose,
  //     DEFAULT_ITEMS_COUNT_LIMIT,
  //   } = useHooks();
  //   const verticalCenter = { display: "flex", justifyContent: "center" };
  //   const flexCenter = { display: "flex", alignItems: "center" };
  //   if (!currentItem) return null;

  //   const DetailDialogTitle = memo(() => {
  //     return (
  //       <Grid container>
  //         <Grid xs={10}>
  //           <DialogTitle>{currentItem.name}</DialogTitle>
  //         </Grid>
  //         <Grid xs={2} sx={verticalCenter}>
  //           <PinIcon
  //             currentItem={currentItem}
  //             handlePinClick={handlePinClick}
  //             priceTrackerSet={priceTrackerSet}
  //             open={open}
  //             handleClose={handleClose}
  //             DEFAULT_ITEMS_COUNT_LIMIT={DEFAULT_ITEMS_COUNT_LIMIT}
  //           />
  //           <Tooltip title="WiKi link">
  //             <IconButton
  //               disableRipple
  //               onClick={() => handleWikiLinkClick(currentItem.wikiLink)}
  //             >
  //               <LanguageIcon />
  //             </IconButton>
  //           </Tooltip>
  //         </Grid>
  //       </Grid>
  //     );
  //   });

  //   const BasePrice = memo(() => {
  //     return (
  //       <Grid container spacing={2}>
  //         <Grid xs={6} sx={flexCenter}>
  //           <Tooltip title="Base price">
  //             <CurrencyRuble style={{ height: "auto", paddingRight: 4 }} />
  //           </Tooltip>
  //           <Typography
  //             variant="subtitle2"
  //             color="text.secondary"
  //             component="div"
  //           >
  //             {ITEM_PROPERTIES.basePrice}
  //           </Typography>
  //         </Grid>
  //         <Grid xs={6}>
  //           <Typography
  //             variant="subtitle1"
  //             color="text.primary"
  //             component="div"
  //           >
  //             {`₽ ${currentItem.basePrice}`}
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //     );
  //   });

  //   const SellPrice = memo(() => {
  //     const maxPriceObj =
  //       currentItem.sellFor?.length !== 0
  //         ? currentItem.sellFor?.reduce((a: ItemPrice, b: ItemPrice) =>
  //             Number(a.priceRUB) > Number(b.priceRUB) ? a : b
  //           )
  //         : null;
  //     const convertCurrency = useCallback(
  //       (currency: Maybe<string> | undefined) => {
  //         switch (currency) {
  //           case "USD":
  //             return "$";
  //           case "EUR":
  //             return "€";
  //           case "RUB":
  //             return "₽";
  //           default:
  //             return "";
  //         }
  //       },
  //       []
  //     );
  //     return (
  //       <Grid container spacing={2}>
  //         <Grid xs={6} sx={flexCenter}>
  //           <Tooltip title="Base price">
  //             <SellIcon style={{ height: "auto", paddingRight: 4 }} />
  //           </Tooltip>
  //           <Typography
  //             variant="subtitle2"
  //             color="text.secondary"
  //             component="div"
  //           >
  //             {ITEM_PROPERTIES.sellPrice}
  //           </Typography>
  //         </Grid>
  //         <Grid xs={6}>
  //           <Typography
  //             variant="subtitle1"
  //             color="text.primary"
  //             component="div"
  //           >
  //             {maxPriceObj
  //               ? `${convertCurrency(maxPriceObj.currency)} ${
  //                   maxPriceObj.price
  //                 } - ${maxPriceObj.vendor.name}`
  //               : "情報がありません"}
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //     );
  //   });

  //   return (
  //     <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
  //       <DetailDialogTitle />
  //       {currentItem.image512pxLink ? (
  //         <Grid sx={verticalCenter}>
  //           <img
  //             style={{ height: 120, width: "auto", maxWidth: "100%" }}
  //             src={currentItem.image512pxLink}
  //             alt="Item"
  //           />
  //         </Grid>
  //       ) : null}
  //       <DialogContent>
  //         <Card variant="outlined">
  //           <Box sx={{ display: "flex", flexDirection: "column" }}>
  //             <CardContentNoPadding>
  //               <Grid container spacing={2}>
  //                 <Grid xs={6} sx={flexCenter}>
  //                   <Tooltip title="Size">
  //                     <ZoomOutMap style={{ height: "auto", paddingRight: 4 }} />
  //                   </Tooltip>
  //                   <Typography
  //                     variant="subtitle2"
  //                     color="text.secondary"
  //                     component="div"
  //                   >
  //                     {langDict.ITEM_DETAIL_DIALOG.SIZE}
  //                   </Typography>
  //                 </Grid>
  //                 <Grid xs={6}>
  //                   <Typography
  //                     variant="subtitle1"
  //                     color="text.primary"
  //                     component="div"
  //                   >
  //                     {`${langDict.ITEM_DETAIL_DIALOG.WIDTH}: ${currentItem.width}   ${langDict.ITEM_DETAIL_DIALOG.HEIGHT}: ${currentItem.height}`}
  //                   </Typography>
  //                 </Grid>
  //               </Grid>
  //               <BasePrice />
  //               <SellPrice />
  //               {currentItem.avg24hPrice ? (
  //                 <Grid container spacing={2}>
  //                   <Grid xs={6} sx={flexCenter}>
  //                     <Tooltip title="24h average price">
  //                       <QueryStats
  //                         style={{ height: "auto", paddingRight: 4 }}
  //                       />
  //                     </Tooltip>
  //                     <Typography
  //                       variant="subtitle2"
  //                       color="text.secondary"
  //                       component="div"
  //                     >
  //                       {ITEM_PROPERTIES.avg24hPrice}
  //                     </Typography>
  //                   </Grid>
  //                   <Grid xs={6}>
  //                     <Typography
  //                       variant="subtitle1"
  //                       color="text.primary"
  //                       component="div"
  //                       sx={{ pl: 2 }}
  //                     >
  //                       {currentItem.avg24hPrice}
  //                     </Typography>
  //                   </Grid>
  //                 </Grid>
  //               ) : null}
  //               {currentItem.usedInTasks.length !== 0 ? (
  //                 <Grid container spacing={1}>
  //                   <Grid xs={6} sx={flexCenter}>
  //                     <Tooltip title="use in task?">
  //                       <QueryStats
  //                         style={{ height: "auto", paddingRight: 4 }}
  //                       />
  //                     </Tooltip>
  //                     <Typography
  //                       variant="subtitle2"
  //                       color="text.secondary"
  //                       component="div"
  //                     >
  //                       {ITEM_PROPERTIES.usedInTasks}
  //                     </Typography>
  //                   </Grid>
  //                   <Grid xs={6}>
  //                     <List>
  //                       {currentItem.usedInTasks.map((task) => (
  //                         <ListItem key={task?.id} disablePadding>
  //                           <ListItemButton
  //                             disableGutters
  //                             component={RouterLink}
  //                             to={`/task/${task?.trader.name}`}
  //                             state={{ taskId: task?.id }}
  //                           >
  //                             <ListItemText
  //                               primaryTypographyProps={{
  //                                 fontSize: "0.8rem",
  //                                 textOverflow: "ellipsis",
  //                                 overflow: "hidden",
  //                                 whiteSpace: "nowrap",
  //                               }}
  //                               color="text.primary"
  //                               primary={task?.name}
  //                             />
  //                           </ListItemButton>
  //                         </ListItem>
  //                       ))}
  //                     </List>
  //                   </Grid>
  //                 </Grid>
  //               ) : null}
  //             </CardContentNoPadding>
  //           </Box>
  //         </Card>
  //         <Card
  //           variant="outlined"
  //           sx={{ display: "flex", flexDirection: "column" }}
  //         >
  //           <Box sx={{ display: "flex", flexDirection: "column" }}>
  //             <CardContentNoPadding>
  //               {currentItem.properties && currentItem.properties.__typename ? (
  //                 <ItemProperties
  //                   typeName={currentItem.properties.__typename}
  //                   ItemId={currentItem.id}
  //                 />
  //               ) : (
  //                 <Typography>
  //                   {langDict.ITEM_DETAIL_DIALOG.NO_DETAIL}
  //                 </Typography>
  //               )}
  //             </CardContentNoPadding>
  //           </Box>
  //         </Card>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // };

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
        langDict={langDict}
        currentItem={currentItem}
        handleWikiLinkClick={handleWikiLinkClick}
        handlePinClick={handlePinClick}
        priceTrackerSet={priceTrackerSet}
        open={open}
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        handleClose={handleClose}
        DEFAULT_ITEMS_COUNT_LIMIT={DEFAULT_ITEMS_COUNT_LIMIT}
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
