import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { memo } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { useHooks } from "./hooks";

export const TopSubtitle = memo(() => {
  const { langDict } = useHooks();
  const { subtitle } = langDict.HOME_SENTENCE;

  const TopSubtitleItem = ({
    primary,
    secondary,
  }: {
    primary: string;
    secondary: string;
  }) => (
    <ListItem disableGutters>
      <ListItemIcon>
        <FiberManualRecordIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={primary}
        primaryTypographyProps={{ variant: "body1" }}
        secondary={secondary}
      />
    </ListItem>
  );

  return (
    <Box p={2}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" pl={2}>
          {langDict.HOME_SENTENCE.subtitle.subtitle1}
        </Typography>
      </Box>
      <List dense>
        <TopSubtitleItem
          primary={subtitle.simple.primary}
          secondary={subtitle.simple.secondary}
        />
        <TopSubtitleItem
          primary={subtitle.accurate.primary}
          secondary={subtitle.accurate.secondary}
        />
        <TopSubtitleItem
          primary={subtitle.fast.primary}
          secondary={subtitle.fast.secondary}
        />
      </List>
    </Box>
  );
});
