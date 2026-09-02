import { LanguageDictContext } from "@/App";
import { Item, ItemPrice, Vendor } from "@/api/types";
import { useItemPrices } from "@/api/hooks";
import { SyntheticEvent, useCallback, useContext, useEffect, useState } from "react";

export const useHooks = () => {
  const DEFAULT_ITEM = "59faff1d86f7746c51718c9c" //Bitcoin
  const langDict = useContext(LanguageDictContext);
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const convNum = (num: number) => {
    return num > 0 ? "+" + num.toString() : num.toString();
  };

  useEffect(() => {
    const storageItem = localStorage.getItem("PriceTracker");
    if (storageItem) {
      setItemIds(JSON.parse(storageItem));
    } else {
      localStorage.setItem("PriceTracker", JSON.stringify([DEFAULT_ITEM]));
      setItemIds([DEFAULT_ITEM]);
    }
    setExpanded(false);
  }, []);

  const { loading, error, data } = useItemPrices(itemIds);
  const convertCurrency = (currency: string | undefined) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "RUB":
        return "₽";
      default:
        return "₽";
    }
  };

  const maxPriceObj = (item: Item | undefined): {text: string, vendor: Vendor | null } => {
    if (!item?.sellFor || item?.sellFor?.length === 0) return {text :"No price data." , vendor:null};
    const resultItem = item.sellFor.reduce((a: ItemPrice, b: ItemPrice) =>
      Number(a.priceRUB) > Number(b.priceRUB) ? a : b
    );
    return { text: `${convertCurrency(resultItem.currency)}${resultItem.price}`, vendor: resultItem.vendor }
  };

  const handleChange =
    (panel: string | undefined) =>
      (event: SyntheticEvent, isExpanded: boolean) => {
        if (!panel) return;
        setExpanded(isExpanded ? panel : false);
      };

  const handleReset = useCallback(() => {
    localStorage.setItem("PriceTracker", JSON.stringify([DEFAULT_ITEM]));
    setItemIds([DEFAULT_ITEM]);
  }, [])

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    handleReset();
    setOpen(false);
  }, [])

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDelete = useCallback((id: string | undefined) => {
    if (!id) return;
    const set = new Set(itemIds);
    set.delete(id);
    localStorage.setItem("PriceTracker", JSON.stringify(Array.from(set)));
    setItemIds(Array.from(set));
  }, [itemIds])

  return {
    langDict,
    loading,
    error,
    data,
    expanded,
    maxPriceObj,
    convNum,
    open,
    handleChange,
    handleClickOpen,
    handleOk,
    handleCancel,
    handleDelete
  }
}