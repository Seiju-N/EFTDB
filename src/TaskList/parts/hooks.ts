import { TaskRewards } from "@/graphql/generated";
import { useCallback } from "react";

export const useHooks = () => {
  const isAllArrayElementsEmpty = useCallback((obj: TaskRewards) => {
    const { __typename, ...newObj } = obj
    return Object.values(newObj).every((val) => val.length === 0);
  }, []);
  return {
    isAllArrayElementsEmpty
  };
}