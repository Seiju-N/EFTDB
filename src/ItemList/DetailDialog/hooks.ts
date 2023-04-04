import { LanguageDictContext } from "@/App";
import { Maybe } from "@/graphql/generated";
import { SyntheticEvent, useCallback, useContext, useState } from "react";

export const useHooks = () => {
  const DEFAULT_ITEMS_COUNT_LIMIT = 8;
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const [priceTrackerSet, setPriceTrackerSet] = useState<Set<string>>(new Set(JSON.parse(localStorage.getItem("PriceTracker") || "[]")));
  const { ITEM_PROPERTIES, ITEM_PROPERTIES_TAB, ITEM_DETAIL_DIALOG } = useContext(LanguageDictContext);
  const verticalCenter = { display: "flex", justifyContent: "center" };
  const flexCenter = { display: "flex", alignItems: "center" };

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handlePinClick = useCallback((id: string) => {
    if (priceTrackerSet.size >= DEFAULT_ITEMS_COUNT_LIMIT && !priceTrackerSet.has(id)) {
      setOpen(true);
      return;
    }
    setPriceTrackerSet((prevPriceTrackerSet) => {
      const newData = new Set(prevPriceTrackerSet);
      newData.has(id) ? newData.delete(id) : newData.add(id);
      localStorage.setItem("PriceTracker", JSON.stringify(Array.from(newData)));
      setOpen(true);
      return newData;
    });
  }, []);

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleWikiLinkClick = useCallback((link: Maybe<string> | undefined) => {
    if (!link) return null;
    window.open(link);
  }, []);


  return {
    DEFAULT_ITEMS_COUNT_LIMIT,
    selectedTab,
    open,
    priceTrackerSet,
    handleTabChange,
    handlePinClick,
    handleClose,
    handleWikiLinkClick,
    ITEM_PROPERTIES,
    ITEM_PROPERTIES_TAB,
    ITEM_DETAIL_DIALOG,
    verticalCenter,
    flexCenter,
  }
}