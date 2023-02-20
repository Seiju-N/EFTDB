import { CategoryContext, LanguageDictContext } from "../App";
import { useContext, useState } from "react";
import { ItemCategory } from "@/graphql/generated";
import { toPascalCase } from "../utils";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  ListItem,
} from "@mui/material";

export const useHooks = () => {
  const langDict = useContext(LanguageDictContext);
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const categories = useContext(CategoryContext);

  const CategoryAmmo = () => {
    return (
      <>
        <ListItemButton component={RouterLink} to={`item/Ammo`}>
          <ListItemText primary="Ammo" />
        </ListItemButton>
      </>
    );
  };

  const CategoryWeapon = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClick = () => {
      setOpen(!open);
    };
    const parsedCategories: ItemCategory[] = categories.filter(
      (category) => category.parent?.name === "Weapon"
    );
    return (
      <>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Weapon" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {parsedCategories.map((category) => (
              <ListItem key={category.name}>
                <ListItemButton
                  component={RouterLink}
                  to={`item/${toPascalCase(category.normalizedName)}`}
                >
                  <ListItemText>{category.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  const CategoryWeaponMod = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => {
      setOpen(!open);
    };

    const filterByParentCategory = (parentCategory: string): ItemCategory[] => {
      return categories.filter(
        (category) => category.parent?.name === parentCategory
      );
    };

    type props = {
      category: ItemCategory;
    };
    const NestedList = ({ category }: props) => {
      const [openDeep, setOpenDeep] = useState<boolean>(false);
      const handleClickDeep = () => {
        setOpenDeep(!openDeep);
      };

      return (
        <>
          <ListItem
            key={category.name}
            secondaryAction={
              <ListItemButton onClick={handleClickDeep}>
                {openDeep ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            }
          >
            <ListItemButton
              component={RouterLink}
              to={`item/${toPascalCase(category.normalizedName)}`}
            >
              <ListItemText>{category.name}</ListItemText>
            </ListItemButton>
          </ListItem>
          <Collapse in={openDeep} timeout="auto" unmountOnExit>
            <List>
              {filterByParentCategory(category.name).map((category) => (
                <ListItem>
                  <ListItemButton
                    component={RouterLink}
                    to={`item/${toPascalCase(category.normalizedName)}`}
                  >
                    <ListItemText inset>{category.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </>
      );
    };

    return (
      <>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Weapon mod" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {filterByParentCategory("Weapon mod").map((category) => (
              <NestedList category={category} />
            ))}
          </List>
        </Collapse>
      </>
    );
  };
  return {
    CategoryAmmo,
    CategoryWeapon,
    CategoryWeaponMod,
    langDict,
    fetchParams,
  };
};
