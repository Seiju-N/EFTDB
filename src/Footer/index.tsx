import { Box, Button } from "@mui/material";
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
        height: 100,
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        fontSize: 12,
        mt: 2,
      }}
    >
      <Box>
        <Button
          href="https://paypal.me/NSeiju"
          endIcon={<RecommendIcon />}
          sx={{ textTransform: "unset !important" }}
        >
          {langDict.FOOTER_SENTENCE.donate}(paypal)
        </Button>
      </Box>
      <Box>
        <Button
          href="https://github.com/Seiju-N/EFTDB/issues"
          endIcon={<GitHubIcon />}
          sx={{ textTransform: "unset !important" }}
        >
          {langDict.FOOTER_SENTENCE.report}
        </Button>
      </Box>
      <Box>{"© 2023 EFTDB. All rights reserved."}</Box>
    </Box>
  );
};
