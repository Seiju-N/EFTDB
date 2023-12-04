import { LanguageDictContext } from "@/App";
import { useSnackBar } from "@/contexts/SnackBarContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useHooks = () => {
  const history = useNavigate();
  const langDict = useContext(LanguageDictContext);
  const { showSnackBar } = useSnackBar();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://cxfck57axf.execute-api.ap-northeast-1.amazonaws.com/default/handle_logout",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
        }
      );
      const data = await response.json();
      if (response.ok && data.isLogout) {
        history("/");
        showSnackBar({ message: langDict.LOGIN_STATUS.logout_msg, severity: "success" })
      } else {
        console.error("ログアウトに失敗しました");
      }
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
    }
  };

  return {
    handleLogout,
  };
}