import { useContext, useEffect, useState } from "react";

import { LanguageDictContext } from "@/App";
import axios from "axios";
import { Item } from "@/graphql/generated";

export const useHooks = () => {
  const langDict = useContext(LanguageDictContext);

  type itemType = {
    item: Item;
    count: number;
    buyPrice?: number;
    sellPrice?: number;
  }
  type profitType = {
    buyItems: Array<itemType>,
    sellItem: itemType,
    buyPrice: number,
    sellPrice: number,
    profit: number,
  }
  const [data, setData] = useState<Array<profitType>>([]);

  useEffect(() => {
    const access_api = async () => {
      try {
        const response = await axios.get(
          "https://2wg3tc9v94.execute-api.ap-northeast-1.amazonaws.com/get_profit"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    access_api();
  }, []);

  return {
    langDict,
    data,
  };
};
