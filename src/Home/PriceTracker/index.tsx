import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { CustomDialog } from "./CustomDialog";
import { useHooks } from "./hooks";
import { Title } from "./Title";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ClearIcon from "@mui/icons-material/Clear";
import TimelineIcon from "@mui/icons-material/Timeline";
import { PriceChart } from "./PriceChart";

export const PriceTracker = memo(() => {
  const {
    langDict,
    loading,
    error,
    data,
    expanded,
    convNum,
    maxPriceObj,
    open,
    handleChange,
    handleClickOpen,
    handleOk,
    handleCancel,
    handleDelete,
  } = useHooks();
  if (error) return null;

  if (loading || !data)
    return (
      <Paper sx={{ height: 600 }}>
        <Title
          loading={loading}
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
    <Paper sx={{ display: "flex", flexDirection: "column", minHeight: 720 }}>
      <Title
        loading={loading}
        handleClickOpen={handleClickOpen}
        langDict={langDict}
      />
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
          if (!item) return null;
          if (!item.changeLast48h || !item.changeLast48hPercent)
            return (
              <ListItem key={`${item.id}_${index}`}>
                <ListItemIcon>
                  <img
                    src={item.image512pxLink?.toString()}
                    alt={item.name?.toString()}
                    width={50}
                    style={{ objectFit: "contain", flexGrow: 1 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={maxPriceObj(item)}
                  primaryTypographyProps={{
                    width: { md: "14vw", xs: "40vw" },
                    maxWidth: { md: 190, xs: 400 },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  sx={{
                    textAlign: "left",
                  }}
                />
                <Box sx={{ width: { md: 96, xs: 200 } }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Item not in Flea Market
                  </Typography>
                </Box>
                <Tooltip title="Remove Item">
                  <IconButton
                    sx={{ width: 20 }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            );
          const TrendingIcon =
            item.changeLast48hPercent >= 0 ? TrendingUpIcon : TrendingDownIcon;

          const color = item.changeLast48hPercent >= 0 ? "primary" : "error";
          return (
            <Accordion
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
              key={`${item.id}_${index}`}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary>
                <ListItemIcon>
                  <img
                    src={item.image512pxLink?.toString()}
                    alt={item.name?.toString()}
                    width={50}
                    style={{ objectFit: "contain", flexGrow: 1 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={maxPriceObj(item)}
                  primaryTypographyProps={{
                    width: { md: "14vw", xs: "40vw" },
                    maxWidth: { md: 190, xs: 400 },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  sx={{
                    textAlign: "left",
                  }}
                />
                <Box sx={{ minWidth: { md: 96, xs: 200 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      verticalAlign: "middle",
                      alignItems: "center",
                    }}
                  >
                    <TimelineIcon
                      sx={{ verticalAlign: "middle" }}
                      fontSize="medium"
                    />
                    <Typography
                      variant="h6"
                      color="text.primary"
                      pl={0.5}
                      sx={{ color: color, whiteSpace: "nowrap" }}
                    >
                      {`${convNum(item.changeLast48h)} ₽`}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      verticalAlign: "middle",
                      alignItems: "center",
                    }}
                  >
                    <TrendingIcon
                      sx={{ verticalAlign: "middle" }}
                      color={color}
                      fontSize="medium"
                    />
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      pl={0.5}
                    >
                      {`${convNum(item.changeLast48hPercent)}%`}
                    </Typography>
                  </Box>
                </Box>
                <Tooltip title="Remove Item">
                  <IconButton
                    sx={{ width: 20 }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 1 }}>
                <PriceChart itemId={item.id} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </List>
      <CustomDialog
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
        langDict={langDict}
      />
    </Paper>
  );
});
