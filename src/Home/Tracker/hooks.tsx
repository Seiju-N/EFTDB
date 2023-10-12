import { Box, CardContent, Typography } from "@mui/material";
import { memo, useContext, useEffect, useState } from "react";

import { LanguageDictContext } from "@/App";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import moment from "moment-timezone";
import axios from "axios";

export const useHooks = () => {
  const langDict = useContext(LanguageDictContext);

  type menuTitleProps = {
    titleStr: string;
  };

  type TrackerType = {
    "Current Map": string;
    Location: string;
    Report: string;
    Time: Date;
    TimeSubmitted: string;
  };

  const MenuTitle = memo(({ titleStr }: menuTitleProps) => {
    return (
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FmdBadIcon fontSize="large" />
          <Typography variant="h5" pl={1}>
            {titleStr}
          </Typography>
        </Box>
      </CardContent>
    );
  });

  const [data, setData] = useState<TrackerType | null>(null);

  useEffect(() => {
    const access_api = async () => {
      try {
        const response = await axios.get(
          "https://xldkzgc2nf.execute-api.ap-northeast-1.amazonaws.com/tracker"
        );
        const rawData = response.data;
        if (rawData.Time) {
          const estDate = moment
            .utc(rawData.Time, "MMMM D, YYYY, h:mm a")
            .utcOffset(-5, true);
          const localDate = moment(estDate).local();
          rawData.Time = new Date(localDate.format());
        }
        setData(rawData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    access_api();
  }, []);

  return {
    langDict,
    MenuTitle,
    data,
  };
};
