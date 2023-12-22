import { Box, Button, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import RecommendIcon from "@mui/icons-material/Recommend";
import { LanguageDictContext } from "@/App";
import { useContext } from "react";

export const Footer = () => {
  const langDict = useContext(LanguageDictContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
        color: "#ffffff",
        fontSize: (theme) => theme.typography.subtitle1.fontSize,
        mt: "auto",
        height: {
          xs: 120,
          sm: 80,
        },
      }}
    >
      <Button
        href="https://paypal.me/NSeiju"
        endIcon={<RecommendIcon />}
        sx={{ textTransform: "unset !important", py: 0, textAlign: "center" }}
      >
        {langDict.FOOTER_SENTENCE.donate}(paypal)
      </Button>
      <Button
        href="https://github.com/Seiju-N/EFTDB/issues"
        endIcon={<GitHubIcon />}
        sx={{ textTransform: "unset !important", py: 0, textAlign: "center" }}
      >
        {langDict.FOOTER_SENTENCE.report}
      </Button>
      <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
        {
          "Game content and materials are trademarks and copyrights of Battlestate Games and its licensors. All rights reserved."
        }
      </Typography>
    </Box>
  );
};
