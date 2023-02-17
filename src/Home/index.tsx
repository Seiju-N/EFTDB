import { ServerStatus as ServerStatusType } from "@/graphql/generated";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import DoubleArrow from "@mui/icons-material/DoubleArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StorageIcon from "@mui/icons-material/Storage";
import Grid from "@mui/material/Unstable_Grid2";
import { TradersContext } from "../App";
import { ReactComponent as Discord } from "../img/discord.svg";

const Home = () => {
  const [serverStatus, setServerStatus] = useState<ServerStatusType>({});
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const TypographySx = () => {
    return (
      <Typography
        sx={{
          fontSize: {
            xs: "1.5rem",
            md: "2.4rem",
          },
        }}
        color="text.secondary"
      >
        Welcome to
      </Typography>
    );
  };

  const Menu = () => {
    const traders = useContext(TradersContext);
    return (
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                Want to search for items?
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={RouterLink} to={`item/`}>
                <DoubleArrow fontSize="large" />
                <Typography variant="h4">ITEM</Typography>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                Want to search for tasks?
              </Typography>
            </CardContent>
            <List component="div" disablePadding>
              {traders.map((trader) => (
                <ListItem
                  alignItems="flex-start"
                  key={trader.name}
                  disablePadding
                >
                  <ListItemButton
                    component={RouterLink}
                    to={`task/${trader.name}`}
                  >
                    <ListItemAvatar>
                      <Avatar alt={trader.name} src={trader.imageLink || ""} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={trader.name}
                      primaryTypographyProps={{ fontSize: "1.4rem" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const ServerStatus = () => {
    return (
      <Paper sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center" }} p={2}>
          <StorageIcon fontSize="large" />
          <Typography variant="h5" pl={1}>
            Server Status
          </Typography>
        </Box>

        <List>
          {serverStatus.currentStatuses?.map((status, index) => (
            <Grid container key={index}>
              <Grid xs={10}>
                <Typography variant="h6" paddingLeft={2}>
                  {status?.name}
                </Typography>
              </Grid>
              <Grid xs={2}>
                {status?.status === 0 ? (
                  <CheckCircleIcon fontSize="large" color="success" />
                ) : (
                  <CancelIcon fontSize="large" color="error" />
                )}
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle2" pl={2} pb={2}>
                  {status?.message}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </List>
      </Paper>
    );
  };
  useEffect(() => {
    const access_api = async () => {
      await fetch("https://api.tarkov.dev/graphql", {
        ...fetchParams,
        body: JSON.stringify({
          query: `{
            status{
              currentStatuses{
                message
                name
                status
                statusCode
              }
              generalStatus{
                message
                name
                status
                statusCode
              }
              messages{
                content
                solveTime
                statusCode
                time
                type
              }
            }
          }`,
        }),
      })
        .then((r) => r.json())
        .then(({ data }) => {
          setServerStatus(data.status);
        });
    };
    access_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Box m={2}>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <TypographySx />
          <Typography variant="h3" pl={1}>
            EFTDB.
          </Typography>
        </Box>

        <Button startIcon={<Discord height={22} />}>
          <Typography
            variant="h5"
            color="text.secondary"
            textTransform={"none"}
          >
            Join our Discord server.
          </Typography>
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid xs={12} md={9}>
          <Menu />
        </Grid>
        <Grid xs={12} md={3}>
          <ServerStatus />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
