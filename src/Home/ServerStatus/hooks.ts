import { LanguageDictContext } from "@/App";
import { Query } from "@/graphql/generated";
import { GET_SERVER_STATUS } from "@/query";
import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";

export const useHooks = () => {
  const [open, setOpen] = useState(false);
  const langDict = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<Query>(GET_SERVER_STATUS);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return {
    langDict, loading, error, data, open, handleClickOpen, handleClose
  }
}