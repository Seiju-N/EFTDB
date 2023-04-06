import { dictType } from "@/constants/languages/types";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { memo } from "react";
import StorageIcon from "@mui/icons-material/Storage";
import WarningIcon from "@mui/icons-material/Warning";
import { Query } from "@/graphql/generated";

type Props = {
  data: Query | undefined;
  handleClickOpen: () => void;
  langDict: dictType;
};

export const Title = memo(({ data, handleClickOpen, langDict }: Props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }} p={2}>
      <StorageIcon fontSize="medium" />
      <Typography variant="h5" pl={1} flexGrow={1}>
        {langDict.HOME_SENTENCE.server_status.title}
      </Typography>
      {data?.status.messages && data?.status.messages.length > 0 ? (
        <Tooltip title={"More information"}>
          <IconButton onClick={handleClickOpen}>
            <WarningIcon color="warning" />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
});
