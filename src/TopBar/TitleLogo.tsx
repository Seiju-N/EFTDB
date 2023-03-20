import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { SITE_NAME } from "@/constants/CONST_VALUES";
export const TitleLogo = () => {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component={RouterLink}
        to={""}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {SITE_NAME}
      </Typography>
    </>
  );
};
