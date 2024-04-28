import { useCallback } from "react";

const _REDIRECT_URL =
  `https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds%20email`;

export const useHooks = () => {
  const handleLogin = useCallback(() => {
    window.location.href = _REDIRECT_URL;
  }, []);

  return {
    handleLogin,
  };
};
