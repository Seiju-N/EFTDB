import { styled } from "@mui/material";
import { DataGrid as MUIDataGrid } from "@mui/x-data-grid";

export const DataGrid = styled(MUIDataGrid)(({ theme }) => ({
  "& .MuiDataGrid-root": {
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiDataGrid-cell": {
    color: theme.palette.text.primary,
    borderColor: theme.palette.grey[600],
  },
  "& .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-header": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.secondary,
  },
  "& .MuiDataGrid-row.Mui-even": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiDataGrid-row.Mui-odd": {
    backgroundColor: theme.palette.background.default,
  },
}));
