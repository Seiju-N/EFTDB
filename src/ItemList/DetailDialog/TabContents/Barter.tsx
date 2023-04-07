import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { memo } from "react";
import { Item, Maybe, Trader } from "@/graphql/generated";
import { CardContentNoPadding } from "@/components/CardContentNoPadding";
import { useHooks } from "../hooks";

type Props = {
  currentItem: Item;
  cashOffersData: ReadonlyArray<Maybe<Trader>>;
};

export const Barter = memo(({ currentItem, cashOffersData }: Props) => {
  const { ITEM_DETAIL_DIALOG } = useHooks();
  const filteredData = cashOffersData
    .map((cashOfferData) => {
      const foundCashOffer = cashOfferData?.cashOffers.find((cashOffer) => {
        return cashOffer?.item.id == currentItem.id;
      });

      return foundCashOffer
        ? {
            ...foundCashOffer,
            traderName: cashOfferData?.name,
          }
        : null;
    })
    .filter((cashOffer) => cashOffer !== null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CardContentNoPadding>
        <List disablePadding>
          {filteredData.length !== 0 ? (
            <ListSubheader disableGutters sx={{ lineHeight: 1 }}>
              {ITEM_DETAIL_DIALOG.CASH}
            </ListSubheader>
          ) : null}
          {filteredData.map((cashOffer, index) => (
            <ListItem key={index} dense>
              <ListItemText
                sx={{ mt: 0 }}
                primary={
                  <Typography variant="h6">{cashOffer?.traderName}</Typography>
                }
                secondary={`LL > ${cashOffer?.minTraderLevel}`}
              />
            </ListItem>
          ))}
          {currentItem.bartersFor.length !== 0 ? (
            <ListSubheader disableGutters sx={{ lineHeight: 1, pt: 2 }}>
              {ITEM_DETAIL_DIALOG.BARTER}
            </ListSubheader>
          ) : null}
          {currentItem.bartersFor.map((barter, index) => (
            <>
              <ListItem key={index} dense>
                <ListItemText
                  sx={{ mt: 0 }}
                  primary={
                    <>
                      <Typography variant="h6">
                        {barter?.trader.name} LL{barter?.level}
                        {barter?.taskUnlock?.name &&
                          ` (${barter?.taskUnlock?.name} completed)`}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Grid container spacing={2}>
                      {barter?.requiredItems.map((requiredItem, index) => (
                        <Grid
                          xs={6}
                          key={index}
                          sx={{ display: "flex", alignItems: "center" }}
                          component={"div"}
                        >
                          {requiredItem?.item.iconLink && (
                            <img
                              src={requiredItem.item.iconLink}
                              alt={requiredItem?.item.name ?? ""}
                              style={{
                                width: "36px",
                                height: "36px",
                                marginRight: "8px",
                              }}
                            />
                          )}
                          <Typography variant="body1">
                            {requiredItem?.item.name} x {requiredItem?.quantity}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  }
                  secondaryTypographyProps={{ component: "div" }}
                />
              </ListItem>
              {currentItem.bartersFor.length - 1 !== index && <Divider />}
            </>
          ))}
        </List>
        {filteredData.length === 0 && currentItem.bartersFor.length === 0 && (
          <Box
            sx={{
              height: 116,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color={"text.secondary"}>
              No information available
            </Typography>
          </Box>
        )}
      </CardContentNoPadding>
    </Box>
  );
});
