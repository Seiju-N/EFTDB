import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const history = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) {
      console.error("認証コードがURLに含まれていません。");
      history("/AuthError");
      return;
    }

    // AWS Lambdaに送信するリクエストの設定
    const fetchAuthToken = async () => {
      try {
        const response = await fetch(
          "https://cxfck57axf.execute-api.ap-northeast-1.amazonaws.com/default/handle_discord_oauth_prod",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({ code }),
          }
        );

        if (!response.ok || response.status !== 200) {
          throw new Error("サーバーからのレスポンスが正常ではありません。");
        } else {
          const _data = await response.json();
          console.log("認証に成功しました。");

          history("/");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
        history("/AuthError");
      }
    };

    fetchAuthToken();
  }, [history]);

  return (
    <div>
      <p>認証中...</p>
    </div>
  );
};
