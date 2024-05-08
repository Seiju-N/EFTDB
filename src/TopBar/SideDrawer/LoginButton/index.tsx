import Login from "@mui/icons-material/Login";
import { IconButton, Tooltip } from "@mui/material";
import { memo } from "react";
import { useHooks } from "./hooks";
//Discordでログイン
export const LoginButton = memo(() => {
  const { handleLogin } = useHooks();
  return (
    <Tooltip title="Discord Sign-In">
      <IconButton onClick={handleLogin}>
        <Login />
      </IconButton>
    </Tooltip>
  );
});
