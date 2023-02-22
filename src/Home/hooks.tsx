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
        <ListItem>
          <ListItemButton
            component={RouterLink}
            to={`item/${toPascalCase(parsedCategory?.normalizedName)}`}
          >
            <ListItemText primary={categoryName} />
          </ListItemButton>
        </ListItem>
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
    if (!parsedCategories || parsedCategories.length === 0) return null;
    return (
      <>
        <ListItem
          secondaryAction={
            <ListItemButton onClick={handleClick}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          }
        >
          <ListItemButton
            component={RouterLink}
            to={`item/${toPascalCase(categoryName)}`}
          >
            <ListItemText primary={categoryName} />
          </ListItemButton>
        </ListItem>
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

    const filterByParentCategory = categories.filter(
      (category) => category.parent?.name === categoryName
    );

    type props = {
      category: ItemCategory;
    };
    const NestedList = ({ category }: props) => {
      const [openDeep, setOpenDeep] = useState<boolean>(false);
      const handleClickDeep = () => {
        setOpenDeep(!openDeep);
      };
      const filterByParentCategory = categories.filter(
        (category) => category.parent?.name === category.name
      );
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
              {filterByParentCategory.map((category) => (
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
        <ListItem
          secondaryAction={
            <ListItemButton onClick={handleClick}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          }
        >
          <ListItemButton
            component={RouterLink}
            to={`item/${toPascalCase(categoryName)}`}
          >
            <ListItemText primary={categoryName} />
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {filterByParentCategory.map((category) => (
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
    categories,
  };
};
