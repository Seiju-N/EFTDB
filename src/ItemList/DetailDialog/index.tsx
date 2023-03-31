import { LanguageDictContext } from "@/App";
import { Item, ItemPrice } from "@/graphql/generated";
import CurrencyRuble from "@mui/icons-material/CurrencyRuble";
import QueryStats from "@mui/icons-material/QueryStats";
import ZoomOutMap from "@mui/icons-material/ZoomOutMap";
import LanguageIcon from "@mui/icons-material/Language";
import SellIcon from "@mui/icons-material/Sell";
import Grid from "@mui/material/Unstable_Grid2";
import { CardContent, styled } from "@mui/material";
import {
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { Maybe } from "graphql/jsutils/Maybe";
import { memo, useCallback, useContext } from "react";
import { ItemProperties } from "../ItemProperties";
import { PinIcon } from "../PinIcon";
import { dictType } from "@/constants/languages/types";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  langDict: dictType;
  currentItem: Item | undefined;
  handleWikiLinkClick: (link: Maybe<string> | null) => void;
  handlePinClick: (id: string) => void;
  priceTrackerSet: Set<string>;
  open: boolean;
  dialogOpen: boolean;
  handleClose: () => void;
  handleDialogClose: () => void;
  DEFAULT_ITEMS_COUNT_LIMIT: number;
};

export const DetailDialog = ({
  langDict,
  currentItem,
  handleWikiLinkClick,
  handlePinClick,
  priceTrackerSet,
  dialogOpen,
  open,
  handleClose,
  handleDialogClose,
  DEFAULT_ITEMS_COUNT_LIMIT,
}: Props) => {
  const { ITEM_PROPERTIES } = useContext(LanguageDictContext);
  const verticalCenter = { display: "flex", justifyContent: "center" };
  const flexCenter = { display: "flex", alignItems: "center" };
  if (!currentItem) return null;
  const CardContentNoPadding = styled(CardContent)(`
    padding: 16px;
    &:last-child {
      padding-bottom: 16px;
    }
  `);
  const DetailDialogTitle = memo(() => {
    return (
      <Grid container>
        <Grid xs={10}>
          <DialogTitle>{currentItem.name}</DialogTitle>
        </Grid>
        <Grid xs={2} sx={verticalCenter}>
          <PinIcon
            currentItem={currentItem}
            handlePinClick={handlePinClick}
            priceTrackerSet={priceTrackerSet}
            open={open}
            handleClose={handleClose}
            DEFAULT_ITEMS_COUNT_LIMIT={DEFAULT_ITEMS_COUNT_LIMIT}
          />
          <Tooltip title="WiKi link">
            {currentItem.wikiLink && currentItem.wikiLink !== "" ? (
              <IconButton
                disableRipple
                onClick={() => handleWikiLinkClick(currentItem.wikiLink)}
              >
                <LanguageIcon />
              </IconButton>
            ) : (
              <IconButton disableRipple disabled>
                <LanguageIcon />
              </IconButton>
            )}
          </Tooltip>
        </Grid>
      </Grid>
    );
  });

  const BasePrice = memo(() => {
    return (
      <Grid container spacing={2}>
        <Grid xs={6} sx={flexCenter}>
          <Tooltip title="Base price">
            <CurrencyRuble style={{ height: "auto", paddingRight: 4 }} />
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
          <Typography variant="subtitle1" color="text.primary" component="div">
            {`₽ ${currentItem.basePrice}`}
          </Typography>
        </Grid>
      </Grid>
    );
  });

  const SellPrice = memo(() => {
    const maxPriceObj =
      currentItem.sellFor?.length !== 0
        ? currentItem.sellFor?.reduce((a: ItemPrice, b: ItemPrice) =>
            Number(a.priceRUB) > Number(b.priceRUB) ? a : b
          )
        : null;
    const convertCurrency = useCallback(
      (currency: Maybe<string> | undefined) => {
        switch (currency) {
          case "USD":
            return "$";
          case "EUR":
            return "€";
          case "RUB":
            return "₽";
          default:
            return "";
        }
      },
      []
    );
    return (
      <Grid container spacing={2}>
        <Grid xs={6} sx={flexCenter}>
          <Tooltip title="Base price">
            <SellIcon style={{ height: "auto", paddingRight: 4 }} />
          </Tooltip>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {ITEM_PROPERTIES.sellPrice}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography variant="subtitle1" color="text.primary" component="div">
            {maxPriceObj
              ? `${convertCurrency(maxPriceObj.currency)} ${
                  maxPriceObj.price
                } - ${maxPriceObj.vendor.name}`
              : "情報がありません"}
          </Typography>
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
              <BasePrice />
              <SellPrice />
              {currentItem.avg24hPrice ? (
                <Grid container spacing={2}>
                  <Grid xs={6} sx={flexCenter}>
                    <Tooltip title="24h average price">
                      <QueryStats style={{ height: "auto", paddingRight: 4 }} />
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
                      <QueryStats style={{ height: "auto", paddingRight: 4 }} />
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
                <Typography>{langDict.ITEM_DETAIL_DIALOG.NO_DETAIL}</Typography>
              )}
            </CardContentNoPadding>
          </Box>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
