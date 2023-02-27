import { gql, useQuery } from "@apollo/client";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StorageIcon from "@mui/icons-material/Storage";
import { Box, List, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import type { Query } from "@/graphql/generated";

import { useHooks } from "./hooks";

export const ServerStatus = () => {
  const { langDict } = useHooks();
  const SERVER_STATUS_QUERY = gql`
    query getServerStatus {
      status {
        currentStatuses {
          message
          name
          status
          statusCode
        }
        generalStatus {
          message
          name
          status
          statusCode
        }
        messages {
          content
          solveTime
          statusCode
          time
          type
        }
      }
    }
  `;
  const { loading, error, data } = useQuery<Query>(SERVER_STATUS_QUERY);
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
            <Grid container key={index} p={1}>
              <Grid xs={10} pl={4}>
                <Typography variant="h6">
                  {langDict.HOME_SENTENCE.server_status[status.name]}
                </Typography>
              </Grid>
              <Grid xs={2} pr={2}>
                {status.status === 0 ? (
                  <CheckCircleIcon fontSize="large" color="success" />
                ) : (
                  <CancelIcon fontSize="large" color="error" />
                )}
              </Grid>
              {status.message ? (
                <Grid xs={12}>
                  <Typography variant="subtitle2" pl={2} pb={1}>
                    {status?.message}
                  </Typography>
                </Grid>
              ) : null}
            </Grid>
          ) : null
        )}
      </List>
    </Paper>
  );
};
