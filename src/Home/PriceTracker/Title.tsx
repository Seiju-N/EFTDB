import { dictType } from "@/constants/languages/types";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { memo } from "react";

type Props = {
  loading: boolean;
  handleClickOpen: () => void;
  langDict: dictType;
};

export const Title = memo(({ loading, handleClickOpen, langDict }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      p={2}
    >
      <QueryStatsIcon fontSize="medium" />
      <Typography variant="h5" pl={1} flexGrow={1}>
        {langDict.HOME_SENTENCE.price_tracker.title}
      </Typography>
      {loading ? null : (
        <Tooltip title={"Reset items."}>
          <IconButton onClick={handleClickOpen}>
            <RotateLeftIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
});
