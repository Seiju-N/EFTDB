import Logout from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { memo } from "react";
import { useHooks } from "./hooks";

export const LogoutButton = memo(() => {
  const { handleLogout } = useHooks();
  return (
    <IconButton onClick={handleLogout} sx={{ opacity: 0, cursor: "default" }}>
      <Logout />
    </IconButton>
  );
});
