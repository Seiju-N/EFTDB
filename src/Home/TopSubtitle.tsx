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
  return (
    <Box p={3}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" pl={2}>
          {langDict.HOME_SENTENCE.subtitle.subtitle1}
        </Typography>
      </Box>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText
            primary={langDict.HOME_SENTENCE.subtitle.simple.primary}
            primaryTypographyProps={{ variant: "body1" }}
            secondary={langDict.HOME_SENTENCE.subtitle.simple.secondary}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText
            primary={langDict.HOME_SENTENCE.subtitle.accurate.primary}
            primaryTypographyProps={{ variant: "body1" }}
            secondary={langDict.HOME_SENTENCE.subtitle.accurate.secondary}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText
            primary={langDict.HOME_SENTENCE.subtitle.fast.primary}
            primaryTypographyProps={{ variant: "body1" }}
            secondary={langDict.HOME_SENTENCE.subtitle.fast.secondary}
          />
        </ListItem>
      </List>
    </Box>
  );
});
