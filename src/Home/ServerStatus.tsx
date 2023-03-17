import { useQuery } from "@apollo/client";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StorageIcon from "@mui/icons-material/Storage";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import type { Query } from "@/graphql/generated";
import { memo } from "react";

import { useHooks } from "./hooks";
import { GET_SERVER_STATUS } from "@/query";

export const ServerStatus = memo(() => {
  const { langDict } = useHooks();

  const { loading, error, data } = useQuery<Query>(GET_SERVER_STATUS);
  if (loading || error || !data) return null;
  return (
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center" }} p={2}>
        <StorageIcon fontSize="medium" />
        <Typography variant="h5" pl={1}>
          {langDict.HOME_SENTENCE.server_status.title}
        </Typography>
      </Box>

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
