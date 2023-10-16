import { ChangeEvent, useEffect, useState } from "react";
import { toPascalCase } from "@/utils";
import { debounce } from "@mui/material";
import { LanguageCode } from "@/graphql/generated";

export type searchResult = {
  id: string | undefined;
  name: string;
  type: string;
  categoryName?: string;
  trader?: string;
};

export const useHooks = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<searchResult[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [allData, setAllData] = useState<searchResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://5bup4s7gdh.execute-api.ap-northeast-1.amazonaws.com/default/get_search_items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lang: LanguageCode.En,
          }),
        });
        const data = await response.json();
        if (data) {
          console.log(data);
          const combinedResults = [...data.tasks, ...data.items];
          setAllData(combinedResults);
        }
        
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const debouncedSearch = debounce((searchValue: string) => {
    const filteredResults = allData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setResults(filteredResults);
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setAnchorEl(event.currentTarget);
    setInputValue(searchValue);

    if (searchValue) {
      debouncedSearch(searchValue);
    } else {
      setResults([]);
    }
  };

  const generateLink = (rowLink: searchResult) => {
    if (rowLink.type === "task") {
      return `/task/${rowLink.trader}`;
    } else {
      return `/item/${toPascalCase(rowLink.categoryName)}`;
    }
  }

  const generateState = (rowState: searchResult) => {
    if (rowState.type === "task") {
      return { taskId: rowState.id };
    } else {
      return { itemId: rowState.id };
    }
  };

  return {
    inputValue,
    results,
    anchorEl,
    isLoading,
    error,
    setResults,
    setInputValue,
    handleChange,
    generateLink,
    generateState,
  };
};
