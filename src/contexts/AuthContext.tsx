import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};
type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogin, setIsLogin] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch(
        "https://ncxgfgecaj.execute-api.ap-northeast-1.amazonaws.com/default/handle_check_auth",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
        }
      );
      const data = await response.json();
      if (response.ok && data.isAuthenticated) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.error("ログイン状態の確認中にエラーが発生しました:", error);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    console.log("ログイン状態を確認します。");
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
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
