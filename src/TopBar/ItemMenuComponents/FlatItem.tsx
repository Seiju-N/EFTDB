import { toPascalCase } from "@/utils";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { useHooks } from "../hooks";

type FlatMenuItemProps = {
  categoryName: string;
  handleClose: () => void;
};

export const FlatItem = ({ categoryName, handleClose }: FlatMenuItemProps) => {
  const { langDict } = useHooks();
  return (
    <ListItem alignItems="flex-start" disableGutters disablePadding>
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
  );
};
