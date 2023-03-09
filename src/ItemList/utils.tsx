import { LanguageDictContext } from "@/App";
import { Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";

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

export const convertPercent = (num: number | undefined) => {
  if (!num) return null;
  if (isNaN(num)) {
    return num;
  } else {
    let str = (Math.round(num * 1000) / 10).toString();
    str.toString().includes("-") ? (str = `${str}%`) : (str = `${str}%`);
    return str;
  }
};

export const translateMaterialName = (
  id: string,
  materials: Record<string, string>[]
) => {
  const material = materials.find((material) => material.id === id);
  return material ? material.name : "";
};
