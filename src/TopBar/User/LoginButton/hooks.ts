import { useCallback } from "react";

const _REDIRECT_URL =
  `https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=https%3A%2F%2Feftdb.info%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds%20email`;

export const useHooks = () => {
  const handleLogin = useCallback(() => {
    window.location.href = _REDIRECT_URL;
  }, []);

  return {
    handleLogin,
  };
};
