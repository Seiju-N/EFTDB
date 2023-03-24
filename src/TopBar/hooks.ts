import { CategoryContext, LanguageDictContext, TradersContext } from "@/App";

import { useCallback, useContext, useState } from "react";

export const useHooks = () => {
  const [taskOpen, setTaskOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const langDict = useContext(LanguageDictContext);
  const categories = useContext(CategoryContext);
  const traders = useContext(TradersContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElTask, setAnchorElTask] = useState<null | HTMLElement>(null);
  const [anchorElItem, setAnchorElItem] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  const handleTaskClick = useCallback(() => {
    setTaskOpen(!taskOpen);
  }, [taskOpen]);

  const handleItemClick = useCallback(() => {
    setItemOpen(!itemOpen);
  }, [itemOpen]);


  const handleOpenTaskMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElTask(event.currentTarget);
    },
    []
  );

  const handleCloseTaskMenu = useCallback(() => {
    setAnchorElTask(null);
  }, []);

  const handleOpenItemMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElItem(event.currentTarget);
    },
    []
  );

  const handleCloseItemMenu = useCallback(() => {
    setAnchorElItem(null);
  }, []);

  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    []
  );
  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleOpenLangMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElLang(event.currentTarget);
    },
    []
  );

  const handleCloseLangMenu = useCallback(() => {
    setAnchorElLang(null);
  }, []);

  return {
    taskOpen,
    itemOpen,
    langDict,
    categories,
    traders,
    anchorElNav,
    anchorElTask,
    anchorElItem,
    anchorElLang,
    setAnchorElTask,
    setAnchorElItem,
    setAnchorElLang,
    handleTaskClick,
    handleItemClick,
    handleOpenTaskMenu,
    handleCloseTaskMenu,
    handleOpenItemMenu,
    handleCloseItemMenu,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleOpenLangMenu,
    handleCloseLangMenu,
  }
}