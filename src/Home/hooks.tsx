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

  // TODO:日本語化対応する
  type nestedCategoryProps = {
    categoryName: string;
  };
  const FlatCategory = ({ categoryName }: nestedCategoryProps) => {
    const parsedCategory: ItemCategory | undefined = categories.find(
      (category) => category.name === categoryName
    );
    if (!parsedCategory) return null;
    return (
      <>
        <ListItemButton
          component={RouterLink}
          to={`item/${toPascalCase(parsedCategory?.normalizedName)}`}
        >
          <ListItemText primary={categoryName} />
        </ListItemButton>
      </>
    );
  };
  const NestedCategory = ({ categoryName }: nestedCategoryProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClick = () => {
      setOpen(!open);
    };
    const parsedCategories: ItemCategory[] = categories.filter(
      (category) => category.parent?.name === categoryName
    );
    return (
      <>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={categoryName} />
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
  const NestedSubcategory = ({ categoryName }: nestedCategoryProps) => {
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
                <ListItem key={`NestedList_${category.name}`}>
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
          <ListItemText primary={categoryName} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {filterByParentCategory(categoryName).map((category) => (
              <NestedList category={category} key={category.name} />
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  return {
    FlatCategory,
    NestedCategory,
    NestedSubcategory,
    langDict,
    fetchParams,
  };
};
