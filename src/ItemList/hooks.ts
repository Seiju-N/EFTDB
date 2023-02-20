import { CardContent, styled } from "@mui/material";
import { enUS, GridColDef, GridSortingInitialState,  } from "@mui/x-data-grid";

export const useHooks = () => {
    const localeText = enUS.components.MuiDataGrid.defaultProps.localeText;

    const cols: GridColDef[] = [
        {
        field: "category",
        headerName: "category",
        minWidth: 120,
        flex: 1,
        valueGetter: ({ value }) => {
            return value.name;
        },
        },
        {
        field: "name",
        headerName: "name",
        minWidth: 200,
        flex: 1,
        },
    ];

    const defaultSort: GridSortingInitialState = {
        sortModel: [{ field: "category", sort: "asc" }],
    };

    const CardContentNoPadding = styled(CardContent)(`
    padding: 16px;
    &:last-child {
      padding-bottom: 16px;
    }
  `);

    return {localeText,cols,defaultSort,CardContentNoPadding}
}