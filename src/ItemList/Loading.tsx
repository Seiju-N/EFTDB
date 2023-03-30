import { Box, CircularProgress, Typography } from "@mui/material";
import { memo } from "react";

export const Loading = memo(() => {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography variant="h4" pl={2}>
        Loading...
      </Typography>
    </Box>
  );
});
