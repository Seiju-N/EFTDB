import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { formatDate, titleFormatDate } from "../../utils";
import { GoonTrackerDataType } from "../types";

const CustomTable = () => {
  const [dataArray, setDataArray] = useState<GoonTrackerDataType[]>([]);

  useEffect(() => {
    const access_api = async () => {
      const response = await fetch(
        "https://gentle-anchorage-57300.herokuapp.com/goonDetectors/direction"
      );
      const body: GoonTrackerDataType[] = await response.json();
      setDataArray(body);
    };
    access_api();
  }, []);
  if (!dataArray) return null;
  return (
    <Box maxHeight={"300px"}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={dataArray.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ margin: "4px" }}>
        <TableContainer sx={{ height: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.1rem" }}>時刻</TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>場所</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataArray
                ? dataArray.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell title={titleFormatDate(data.lastReported)}>
                        {formatDate(data.lastReported)}
                      </TableCell>
                      <TableCell>{data.location}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CustomTable;
