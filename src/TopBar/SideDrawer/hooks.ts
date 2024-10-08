import { LanguageDictContext } from "@/App";
import { useAuth } from "@/contexts/AuthContext";
import { useSnackBar } from "@/contexts/SnackBarContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHooks = () => {
  const history = useNavigate();
  const { showSnackBar } = useSnackBar();
  const langDict = useContext(LanguageDictContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { isLogin, discordUser, setIsLogin, isAdmin } = useAuth();

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

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
        setIsLogin(false);
        showSnackBar({ message: langDict.LOGIN_STATUS.logout_msg, severity: "success" });
        setDrawerOpen(false);
        history("/");
      } else {
        console.error("ログアウトに失敗しました");
      }
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
    }
  };
  return {
    handleLogout,
    drawerOpen,
    langDict,
    isLogin,
    discordUser,
    toggleDrawer,
    handleModalOpen,
    handleModalClose,
    modalOpen,
    isAdmin,
  };
}
