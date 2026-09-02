import { Rewards } from "@/api/types";
import { useCallback } from "react";

export const useHooks = () => {
  const isAllArrayElementsEmpty = useCallback((obj: Rewards) => {
    return Object.values(obj).every((val) => val.length === 0);
  }, []);
  return {
    isAllArrayElementsEmpty
  };
}