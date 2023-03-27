import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { memo } from "react";
import { useHooks } from "./hooks";

export const PriceTracker = memo(() => {
  const { langDict, loading, error, data, maxPriceObj } = useHooks();
  if (error) return null;

  const Title = memo(() => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }} p={2}>
        <QueryStatsIcon fontSize="medium" />
        <Typography variant="h5" pl={1}>
          {langDict.HOME_SENTENCE.price_tracker.title}
        </Typography>
      </Box>
    );
  });
  if (loading || !data)
    return (
      <Paper sx={{ height: 600 }}>
        <Title />
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />
          <Typography variant="h6" pl={2}>
            Loading...
          </Typography>
        </Box>
      </Paper>
    );

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", minHeight: 720 }}>
      <Title />
      {data.items.length === 0 ? (
        <Box
          sx={{
            height: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" pl={2} color="text.disabled">
            There are no target items.
          </Typography>
        </Box>
      ) : null}
      <List>
        {data.items.map((item, index) => {
          return (
            <ListItem
              key={index}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemIcon>
                <img
                  src={item?.image512pxLink?.toString()}
                  alt={item?.name?.toString()}
                  width={50}
                />
              </ListItemIcon>
              <ListItemText
                primary={item?.name}
                secondary={maxPriceObj(item)}
                sx={{ textAlign: "left" }}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
});
