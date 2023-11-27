import { useCallback } from "react";

const _REDIRECT_URL =
  "https://discord.com/api/oauth2/authorize?client_id=1178560759064702976&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&response_type=code&scope=identify%20email%20guilds";

export const useHooks = () => {
  const handleLogin = useCallback(() => {
    window.location.href = _REDIRECT_URL;
  }, []);

  return {
    handleLogin,
  };
};
