import { LanguageDictContext } from "@/App";
import { Query } from "@/graphql/generated";
import { GET_SERVER_STATUS } from "@/query";
import { useQuery } from "@apollo/client";
import { useContext } from "react";

export const useHooks = () => {
  const langDict = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<Query>(GET_SERVER_STATUS);
  return {
    langDict, loading, error, data,
  }
}