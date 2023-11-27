import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const history = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) {
      // 認証コードがない場合、エラーハンドリング
      console.error("認証コードがURLに含まれていません。");
      // ログインページやエラーページにリダイレクトする
      history("/AuthError");
      return;
    }

    // AWS Lambdaに送信するリクエストの設定
    const fetchAuthToken = async () => {
      try {
        const response = await fetch(
          "https://bpszwkieq1.execute-api.ap-northeast-1.amazonaws.com/default/handle_discord_oauth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ code }),
          }
        );

        if (!response.ok) {
          throw new Error("サーバーからのレスポンスが正常ではありません。");
        }

        const data = await response.json();
        // 取得したデータ（ユーザー情報やトークン）を処理
        // 例: ローカルストレージに保存、グローバルステートに設定など

        // ダッシュボードなど、ログイン後のページにリダイレクト
        console.log(data);
        console.log("認証に成功しました。");
        history("/");
      } catch (error) {
        console.error("エラーが発生しました:", error);
        // エラーハンドリング: エラーページにリダイレクトなど
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
