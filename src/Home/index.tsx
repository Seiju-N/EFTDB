import { ServerStatus as ServerStatusType } from "@/graphql/generated";
import { Box, Card, Container, List, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StorageIcon from "@mui/icons-material/Storage";
import Grid from "@mui/material/Unstable_Grid2";

const Home = () => {
  const [serverStatus, setServerStatus] = useState<ServerStatusType>({});
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const Home = () => {
    return <Card>This is home page</Card>;
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
      <Grid container>
        <Grid xs={12} md={9}>
          <Home />
        </Grid>
        <Grid xs={12} md={3}>
          <ServerStatus />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
