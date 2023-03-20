import { Box, IconButton, Tooltip } from "@mui/material";
import { ReactComponent as Discord } from "@/img/discord.svg";
import { useHooks } from "./hooks";

export const DiscordButton = () => {
  const { langDict } = useHooks();
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={langDict.HOME_SENTENCE.discord_server}>
        <IconButton href="https://discord.gg/cjUhFptaxM">
          <Discord height={24} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
