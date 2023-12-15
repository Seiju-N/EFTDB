import React, { createContext, useContext, useEffect, useState } from "react";

type DiscordUser = {
  accent_color: string;
  avatar: string;
  avatar_decoration_data: string;
  banner: string;
  banner_color: string;
  discriminator: string;
  email: string;
  flags: number;
  global_name: string;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  public_flags: number;
  username: string;
  verified: boolean;
  is_staff: boolean;
};

type AuthContextType = {
  isLogin: boolean;
  discordUser: DiscordUser | undefined;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setDiscordUser: React.Dispatch<React.SetStateAction<DiscordUser | undefined>>;
};
type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [discordUser, setDiscordUser] = useState<DiscordUser>();

  const checkLoginStatus = async () => {
    try {
      const response = await fetch(
        "https://cxfck57axf.execute-api.ap-northeast-1.amazonaws.com/default/handle_check_auth",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
        }
      );
      const data = await response.json();
      if (response.ok && data.isAuthenticated) {
        setIsLogin(true);
        setDiscordUser(data.user);
      } else {
        setIsLogin(false);
        setDiscordUser(undefined);
      }
    } catch (error) {
      console.error("ログイン状態の確認中にエラーが発生しました:", error);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLogin, discordUser, setIsLogin, setDiscordUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
