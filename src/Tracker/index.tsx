import React from "react";

import { Box, Divider } from "@mui/material";

import CustomTable from "./CustomTable";
import TitleComponent from "./Title";

const Tracker = () => {
  return (
    <Box height={520}>
      <TitleComponent />
      <Divider />
      <CustomTable />
    </Box>
  );
};

export default Tracker;
