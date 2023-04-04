import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StorageIcon from "@mui/icons-material/Storage";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import { memo, useState } from "react";

import { useHooks } from "./hooks";

export const ServerStatus = memo(() => {
  const { langDict, loading, error, data } = useHooks();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (error) return null;

  const Title = memo(() => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }} p={2}>
        <StorageIcon fontSize="medium" />
        <Typography variant="h5" pl={1} flexGrow={1}>
          {langDict.HOME_SENTENCE.server_status.title}
        </Typography>
        {data?.status.messages && data?.status.messages.length > 0 ? (
          <Tooltip title={"More information"}>
            <IconButton onClick={handleClickOpen}>
              <WarningAmberIcon />
            </IconButton>
          </Tooltip>
        ) : null}
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
              <Tooltip title={status.statusCode}>
                {status.status === 0 ? (
                  <CheckCircleIcon fontSize="medium" color="success" />
                ) : (
                  <CancelIcon fontSize="medium" color="error" />
                )}
              </Tooltip>
            </ListItem>
          ) : null
        )}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Server Status Information"}</DialogTitle>
        <DialogContent>
          <List>
            {data?.status.messages?.map((message, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`[${message?.time}] ${message?.content}`}
                  secondary={`Status: ${message?.statusCode}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
});
