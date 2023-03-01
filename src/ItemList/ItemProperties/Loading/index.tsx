import { Box, CircularProgress, Typography } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress size={36} />
        <Typography variant="h4" pl={2}>
          loading...
        </Typography>
      </Box>
    </Box>
  );
};
