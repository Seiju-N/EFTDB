import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import { memo } from "react";

import { useHooks } from "./hooks";
import { Title } from "./Title";

export const ServerStatus = memo(() => {
  const { langDict, loading, error, data, open, handleClickOpen, handleClose } =
    useHooks();

  if (loading || error || !data)
    return (
      <Paper sx={{ height: 600 }}>
        <Title
          data={data}
          handleClickOpen={handleClickOpen}
          langDict={langDict}
        />
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
      <Title
        data={data}
        handleClickOpen={handleClickOpen}
        langDict={langDict}
      />
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
