
export const useHooks = () => {
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
        window.location.href = "/";
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