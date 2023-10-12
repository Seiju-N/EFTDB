import { Box, Card, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { useHooks } from "./hooks";
import InfoIcon from "@mui/icons-material/Info";

export const Tracker = memo(() => {
  const { MenuTitle, langDict, data } = useHooks();
  return (
    <Card>
      <MenuTitle titleStr={langDict.HOME_SENTENCE.tracker.title} />
      <Box mx={2} mb={2}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {langDict.HOME_SENTENCE.tracker.last_seen}
        </Typography>
        <Typography variant="h4">{data?.["Current Map"]}</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {data?.Time?.toLocaleString()}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <InfoIcon fontSize="inherit" />
          <Typography sx={{ fontSize: 13 }} color="text.secondary">
            {langDict.HOME_SENTENCE.tracker.provide}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
});
