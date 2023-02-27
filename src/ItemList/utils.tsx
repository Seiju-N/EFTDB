import { Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { ARMOR_MATERIAL } from "../constants/LANG_VALUES";

export const CustomSkelton = () => {
  return (
    <Stack>
      <Skeleton animation="wave" height={30} width={60} sx={{ pb: 3 }} />
      <Grid container sx={{ maxHeight: 144, minHeight: 80 }}>
        <Grid xs={6}>
          <Skeleton animation="wave" />
        </Grid>
        <Grid xs={6}>
          <Skeleton animation="wave" />
        </Grid>
        <Grid xs={6}>
          <Skeleton animation="wave" />
        </Grid>
        <Grid xs={6}>
          <Skeleton animation="wave" />
        </Grid>
      </Grid>
    </Stack>
  );
};

export const fetchParams = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const convertPercent = (num: number) => {
  if (isNaN(num)) {
    return num;
  } else {
    let str = (num * 100).toString();
    str.toString().includes("-") ? (str = `${str}%`) : (str = `+${str}%`);
    return str;
  }
};

export const translateMaterialName = (id: string) => {
  const material = ARMOR_MATERIAL.find((material) => material.id === id);
  return material ? material.name : "";
};
