import { Paper, styled } from "@mui/material";

export const ItemCenter = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  height: "68px",
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  color: theme.palette.text.secondary,
  borderRadius: 1,
}));
