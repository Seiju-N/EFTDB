import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StorageIcon from "@mui/icons-material/Storage";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import { memo } from "react";

import { useHooks } from "./hooks";

export const ServerStatus = memo(() => {
  const { langDict, loading, error, data } = useHooks();
  if (error) return null;

  const Title = memo(() => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }} p={2}>
        <StorageIcon fontSize="medium" />
        <Typography variant="h5" pl={1}>
          {langDict.HOME_SENTENCE.server_status.title}
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
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
      <Title />
      <List>
        {data.status.currentStatuses?.map((status, index) =>
          status ? (
            <ListItem
              key={index}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                primary={langDict.HOME_SENTENCE.server_status[status.name]}
                primaryTypographyProps={{ variant: "h6" }}
                sx={{ pl: 2 }}
                secondary={status.message ? status.message : null}
              />
              {status.status === 0 ? (
                <CheckCircleIcon fontSize="medium" color="success" />
              ) : (
                <CancelIcon fontSize="medium" color="error" />
              )}
            </ListItem>
          ) : null
        )}
      </List>
    </Paper>
  );
});
