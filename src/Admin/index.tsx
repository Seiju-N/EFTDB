import { useAuth } from "@/contexts/AuthContext";

export const Admin = () => {
  const { isLogin, discordUser } = useAuth();

  return isLogin && discordUser?.is_staff ? (
    <>管理者です。</>
  ) : (
    <>権限がありません。</>
  );
};
