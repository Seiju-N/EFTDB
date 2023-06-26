import { toPascalCase } from "@/utils";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { useHooks } from "../hooks";
import { useCallback, useState } from "react";
import { ItemCategory, Maybe } from "@/graphql/generated";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

type props = {
  categoryName: string;
  handleClose: () => void;
};

export const NestedItem = ({ categoryName, handleClose }: props) => {
  const { categories, langDict } = useHooks();
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);
  const parsedCategories: Maybe<ItemCategory>[] | undefined =
    categories?.filter((category) => category?.parent?.name === categoryName);
  if (!parsedCategories || parsedCategories.length === 0) return null;
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <ListItemButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        }
        disablePadding
        disableGutters
      >
        <ListItemButton
          component={RouterLink}
          to={`item/${toPascalCase(categoryName)}`}
          onClick={handleClose}
        >
          <ListItemText
            sx={{ pl: 1 }}
            primary={langDict.ITEM_CATEGORY_NAME[toPascalCase(categoryName)]}
          />
        </ListItemButton>
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ backgroundColor: "#1b1b1b" }}
      >
        {parsedCategories.map((category) => (
          <ListItem key={category?.name} disablePadding disableGutters>
            <ListItemButton
              component={RouterLink}
              to={`item/${toPascalCase(category?.normalizedName)}`}
              onClick={handleClose}
            >
              <ListItemText sx={{ pl: 2 }}>
                {
                  langDict.ITEM_CATEGORY_NAME[
                    toPascalCase(category?.normalizedName)
                  ]
                }
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </Collapse>
    </>
  );
};
