import React from "react";
import { useEffect, useState } from "react";

import { Box, Fade, Typography } from "@mui/material";

import type { GoonTrackerDataType } from "../types";
const Title = () => {
  type currentLocationProps = GoonTrackerDataType & {
    reportedBy: "string";
  };
  const [currentLocation, setCurrentLocation] =
    useState<currentLocationProps>();
  useEffect(() => {
    const access_api = async () => {
      const response = await fetch(
        "https://gentle-anchorage-57300.herokuapp.com/goonDetectors/current"
      );
      const body: currentLocationProps = await response.json();
      setCurrentLocation(body);
    };
    access_api();
  }, []);
  return (
    <Box height={80} margin={"4px"}>
      <Typography align="center">Goon squad in ...</Typography>
      <Fade in={currentLocation ? true : false}>
        <Typography align="center" variant="h4">
          {currentLocation?.location}
        </Typography>
      </Fade>
    </Box>
  );
};

export default Title;
