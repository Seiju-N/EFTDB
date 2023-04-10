import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CALIBERS } from "@/constants/CALIBER";
import { Params } from "react-router-dom";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

type Props = {
  param: Readonly<Params<string>>;
  filter: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
};

export const CustomToolbar = ({ param, filter, handleChange }: Props) => {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      {param.categoryName === "Ammo" ? (
        <>
          <FormControl
            sx={{ m: 1, minWidth: 120, height: "100%" }}
            size="small"
          >
            <InputLabel shrink id="select-trader">
              Filter
            </InputLabel>
            <Select
              id="select-trader"
              displayEmpty
              value={filter}
              onChange={handleChange}
            >
              <MenuItem value={""}>None</MenuItem>
              {CALIBERS.map((caliber) => (
                <MenuItem value={caliber.caliberName} key={caliber.caliberName}>
                  {caliber.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      ) : (
        <GridToolbarQuickFilter />
      )}
    </Box>
  );
};
