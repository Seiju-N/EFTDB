import { useContext, useEffect, useState } from "react";

import { LanguageDictContext, TradersContext } from "@/App";
import axios from "axios";
import { Item, Vendor } from "@/graphql/generated";

export const useHooks = () => {
  const langDict = useContext(LanguageDictContext);
  const traders = useContext(TradersContext);

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
    sellVendor: Vendor,
    profit: number,
    sellVendorImageLink: string | null,
  }
  const [data, setData] = useState<Array<profitType>>([]);

  useEffect(() => {
    const access_api = async () => {
      try {
        const response = await axios.get(
          "https://2wg3tc9v94.execute-api.ap-northeast-1.amazonaws.com/get_profit"
        );

        const profitsData = response.data;
        const updatedProfitsData = profitsData.map((profit: profitType) => {
          const correspondingTrader = traders?.find(
            (trader) => trader?.name === profit.sellVendor.name
          );
          const imageLink = correspondingTrader?.imageLink || null;
          return {
            ...profit,
            sellVendorImageLink: imageLink,
          };
        });
        setData(updatedProfitsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    access_api();
  }, [traders]);

  return {
    langDict,
    traders,
    data,
  };
};
