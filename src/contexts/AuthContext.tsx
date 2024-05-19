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
};

type AuthContextType = {
  isLogin: boolean;
  discordUser: DiscordUser | undefined;
  isAdmin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setDiscordUser: React.Dispatch<React.SetStateAction<DiscordUser | undefined>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};
type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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
        setIsAdmin(data.isAdmin);
        setDiscordUser(data.user);
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
      value={{
        isLogin,
        discordUser,
        isAdmin,
        setIsLogin,
        setDiscordUser,
        setIsAdmin,
      }}
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
