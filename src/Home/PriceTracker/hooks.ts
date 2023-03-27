import { LanguageDictContext } from "@/App";
import { Item, ItemPrice, Maybe, Query } from "@/graphql/generated";
import { GET_ITEM_PRICE } from "@/query";
import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";

export const useHooks = () => {
  const DEFAULT_ITEM = "59faff1d86f7746c51718c9c" //Bitcoin
  const langDict = useContext(LanguageDictContext);
  const [itemIds, setItemIds] = useState<string[]>([]);

  useEffect(() => {
    const storageItem = localStorage.getItem("PriceTracker");
    if (storageItem) {
      setItemIds(JSON.parse(storageItem));
    } else {
      localStorage.setItem("PriceTracker", JSON.stringify([DEFAULT_ITEM]));
      setItemIds([DEFAULT_ITEM]);
    }
  }, []);
  
  const { loading, error, data } = useQuery<Query>(GET_ITEM_PRICE,{
    variables: { ids:itemIds },
  });
  const convertCurrency = (currency: Maybe<string> | undefined) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "RUB":
        return "₽";
      default:
        return "";
    }
  };

  const maxPriceObj = (item: Maybe<Item>): string => {
    if (!item?.sellFor || item?.sellFor?.length === 0) return "No price data.";
    const resultItem = item.sellFor.reduce((a: ItemPrice, b: ItemPrice) =>
      Number(a.priceRUB) > Number(b.priceRUB) ? a : b
    );
    return `${convertCurrency(resultItem.currency)} ${resultItem.price}`;
  };
  return {
    langDict, loading, error, data, maxPriceObj
  }
}