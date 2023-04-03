import { Item, ItemPrice } from "@/graphql/generated";
import CurrencyRuble from "@mui/icons-material/CurrencyRuble";
import QueryStats from "@mui/icons-material/QueryStats";
import ZoomOutMap from "@mui/icons-material/ZoomOutMap";
import SellIcon from "@mui/icons-material/Sell";
import ScaleIcon from "@mui/icons-material/Scale";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { Maybe } from "graphql/jsutils/Maybe";
import { memo, useCallback } from "react";
import { ItemProperties } from "./ItemProperties";
import { Link as RouterLink } from "react-router-dom";
import { useHooks } from "./hooks";
import { TabPanel } from "@/components/TabPanel";
import { DetailDialogTitle } from "./Title";

type Props = {
  currentItem: Item | undefined;
  dialogOpen: boolean;
  handleDialogClose: () => void;
};

export const DetailDialog = ({
  currentItem,
  dialogOpen,
  handleDialogClose,
}: Props) => {
  const {
    selectedTab,
    handleTabChange,
    ITEM_PROPERTIES,
    ITEM_PROPERTIES_TAB,
    ITEM_DETAIL_DIALOG,
    verticalCenter,
    flexCenter,
  } = useHooks();
  if (!currentItem) return null;
  const CardContentNoPadding = styled(CardContent)(`
    padding: 16px;
    &:last-child {
      padding-bottom: 16px;
    }
  `);

  const ItemSize = memo(() => {
    return (
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
            {ITEM_DETAIL_DIALOG.SIZE}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography variant="subtitle1" color="text.primary" component="div">
            {`${ITEM_DETAIL_DIALOG.WIDTH}: ${currentItem.width}   ${ITEM_DETAIL_DIALOG.HEIGHT}: ${currentItem.height}`}
          </Typography>
        </Grid>
      </Grid>
    );
  });

  const ItemWeight = memo(() => {
    return (
      <Grid container spacing={2}>
        <Grid xs={6} sx={flexCenter}>
          <Tooltip title="Weight">
            <ScaleIcon style={{ height: "auto", paddingRight: 4 }} />
          </Tooltip>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {ITEM_DETAIL_DIALOG.WEIGHT}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography variant="subtitle1" color="text.primary" component="div">
            {`${currentItem.weight} kg`}
          </Typography>
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
          <Tooltip title="Sell price">
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

  const Avg24hPrice = memo(() => {
    if (!currentItem.avg24hPrice) return null;
    return (
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
          <Typography variant="subtitle1" color="text.primary" component="div">
            {`₽ ${currentItem.avg24hPrice}`}
          </Typography>
        </Grid>
      </Grid>
    );
  });

  const UsedInTasks = memo(() => {
    if (!currentItem.usedInTasks || currentItem.usedInTasks.length === 0)
      return null;
    return (
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
    );
  });

  const DetailTab = memo(() => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContentNoPadding>
          {currentItem.properties && currentItem.properties.__typename ? (
            <ItemProperties
              typeName={currentItem.properties.__typename}
              ItemId={currentItem.id}
            />
          ) : (
            <Typography>{ITEM_DETAIL_DIALOG.NO_DETAIL}</Typography>
          )}
        </CardContentNoPadding>
      </Box>
    );
  });
  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
      <DetailDialogTitle currentItem={currentItem} />
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
              <ItemSize />
              <ItemWeight />
              <BasePrice />
              <SellPrice />
              <Avg24hPrice />
              <UsedInTasks />
            </CardContentNoPadding>
          </Box>
        </Card>

        <Card
          variant="outlined"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab label={ITEM_PROPERTIES_TAB.detail} />
            <Tab label={ITEM_PROPERTIES_TAB.unlock_requirement} />
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
            <DetailTab />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <></>
          </TabPanel>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
