import { useCallback } from "react";

const REACT_APP_DISCORD_CLIENT_ID = process.env.DEVELOPMENT ? process.env.REACT_APP_DISCORD_CLIENT_ID : "1178560759064702976";
const REACT_APP_OAUTH2_REDIRECT_URI = process.env.DEVELOPMENT ? process.env.REACT_APP_OAUTH2_REDIRECT_URI : "https://discord.com/api/oauth2/authorize";

const _REDIRECT_URL =
  `https://discord.com/oauth2/authorize?client_id=${REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${REACT_APP_OAUTH2_REDIRECT_URI}%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds%20email`;

export const useHooks = () => {
  const handleLogin = useCallback(() => {
    window.location.href = _REDIRECT_URL;
  }, []);

  return {
    handleLogin,
  };
};
