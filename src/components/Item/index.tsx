import { Paper, styled } from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "space-arownd",
  alignItems: "center",
  color: theme.palette.text.secondary,
  borderRadius: 1,
}));
