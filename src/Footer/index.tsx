import { Box, Button, styled } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import RecommendIcon from "@mui/icons-material/Recommend";
import { LanguageDictContext } from "@/App";
import { useContext } from "react";

const FooterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: 96,
  backgroundColor: "#121212",
  backgroundImage:
    "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
  color: "#ffffff",
  fontSize: theme.typography.subtitle1.fontSize,
  mt: 4,
}));

export const Footer = () => {
  const langDict = useContext(LanguageDictContext);
  return (
    <FooterBox>
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
    </FooterBox>
  );
};
