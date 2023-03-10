import { Box, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        fontSize: 12,
      }}
    >
      <Box>{"© 2023 EFTDB. All rights reserved."}</Box>
      <Box>
        {
          "If you find any bugs on our site, please report them to our GitHub issues."
        }
        <IconButton href="https://github.com/Seiju-N/EFTDB/issues">
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
