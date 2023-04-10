import { memo, useCallback } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Tooltip, Typography } from "@mui/material";
import { useHooks } from "./hooks";
import { Item, ItemPrice, Maybe } from "@/graphql/generated";
import SellIcon from "@mui/icons-material/Sell";

type Props = {
  currentItem: Item;
};

export const SellPrice = memo(({ currentItem }: Props) => {
  const { flexCenter, ITEM_PROPERTIES } = useHooks();
  const maxPriceObj =
    currentItem.sellFor?.length !== 0
      ? currentItem.sellFor?.reduce((a: ItemPrice, b: ItemPrice) =>
          Number(a.priceRUB) > Number(b.priceRUB) ? a : b
        )
      : null;
  const convertCurrency = useCallback((currency: Maybe<string> | undefined) => {
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
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid xs={6} sx={flexCenter}>
        <Tooltip title={ITEM_PROPERTIES.sellPrice}>
          <SellIcon style={{ height: "auto", paddingRight: 4 }} />
        </Tooltip>
        <Typography variant="subtitle2" color="text.secondary" component="div">
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
