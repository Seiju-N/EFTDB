import {
  Box,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { Item } from "@/graphql/generated";

type Props = {
  currentItem: Item;
};

const CardContentNoPadding = styled(CardContent)(`
  padding: 16px;
  &:last-child {
    padding-bottom: 16px;
  }
`);

export const UnlockRequirement = memo(({ currentItem }: Props) => {
  console.log(currentItem.bartersFor);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CardContentNoPadding>
        <Typography variant="h6">Barters For</Typography>
        <List>
          {currentItem.bartersFor.map((barter, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography component="div" variant="body1">
                    Trader: {barter?.trader.name} (Level {barter?.level})
                  </Typography>
                }
                secondary={
                  <Grid container spacing={2}>
                    {barter?.requiredItems.map((requiredItem, index) => (
                      <Grid item xs={6} key={index}>
                        {requiredItem?.item.iconLink && (
                          <img
                            src={requiredItem.item.iconLink}
                            alt={requiredItem?.item.name ?? ""}
                            style={{
                              width: "32px",
                              height: "32px",
                              marginRight: "8px",
                            }}
                          />
                        )}
                        <Typography component="div" variant="body2">
                          {requiredItem?.item.name} x {requiredItem?.quantity}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContentNoPadding>
    </Box>
  );
});
