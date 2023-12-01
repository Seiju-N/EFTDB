import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@mui/material";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const User = () => {
  const { isLogin, discordUser } = useAuth();

  return (
    <>
      {isLogin && discordUser ? (
        <>
          <Avatar
            alt={discordUser.username}
            src={`https://cdn.discordapp.com/${discordUser.id}/${discordUser.avatar}.png`}
          />
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
};
