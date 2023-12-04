import Login from "@mui/icons-material/Login";
import { IconButton } from "@mui/material";
import { memo } from "react";
import { useHooks } from "./hooks";

export const LoginButton = memo(() => {
  const { handleLogin } = useHooks();
  return (
    <IconButton onClick={handleLogin}>
      <Login />
    </IconButton>
  );
});
