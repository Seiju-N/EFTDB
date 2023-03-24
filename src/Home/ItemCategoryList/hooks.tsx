import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  CardContent,
  Collapse,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { memo, useCallback, useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import type { ItemCategory, Maybe } from "@/graphql/generated";

import {
  CategoryContext,
  LanguageContext,
  LanguageDictContext,
  TradersContext,
} from "@/App";
import { toPascalCase } from "@/utils";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/query";

export const useHooks = () => {
  const langDict = useContext(LanguageDictContext);
  const lang = useContext(LanguageContext);
  const categories = useContext(CategoryContext);
  const traders = useContext(TradersContext);

  const { data: _taskData } = useQuery(GET_TASKS, {
    variables: { lang },
  });
  type nestedCategoryProps = {
    categoryName: string;
  };
  const FlatCategory = ({ categoryName }: nestedCategoryProps) => {
    const parsedCategory: Maybe<ItemCategory> | undefined = categories.find(
      (category) => category?.name === categoryName
    );
    if (!parsedCategory) return null;
    return (
      <>
        <ListItem sx={{ py: 0 }} dense>
          <ListItemButton
            component={RouterLink}
            to={`item/${toPascalCase(parsedCategory?.normalizedName)}`}
          >
            <ListItemText
              primary={
                langDict.ITEM_CATEGORY_NAME[
                  toPascalCase(parsedCategory?.normalizedName)
                ]
              }
            />
          </ListItemButton>
        </ListItem>
      </>
    );
  };
  const NestedCategory = ({ categoryName }: nestedCategoryProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClick = useCallback(() => {
      setOpen(!open);
    }, [open]);
    const parsedCategories: Maybe<ItemCategory>[] = categories.filter(
      (category) => category?.parent?.name === categoryName
    );
    if (!parsedCategories || parsedCategories.length === 0) return null;
    return (
      <>
        <ListItem
          sx={{ py: 0 }}
          dense
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
            <ListItemText
              primary={langDict.ITEM_CATEGORY_NAME[toPascalCase(categoryName)]}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {parsedCategories.map((category) => (
            <ListItem key={category?.name} dense>
              <ListItemButton
                component={RouterLink}
                to={`item/${toPascalCase(category?.normalizedName)}`}
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
  const NestedSubcategory = ({ categoryName }: nestedCategoryProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClick = useCallback(() => {
      setOpen(!open);
    }, [open]);

    const filterByParentCategory = categories.filter(
      (category) => category?.parent?.name === categoryName
    );

    type props = {
      category: Maybe<ItemCategory>;
    };
    const NestedList = ({ category }: props) => {
      const [openDeep, setOpenDeep] = useState<boolean>(false);
      const handleClickDeep = useCallback(() => {
        setOpenDeep(!openDeep);
      }, [openDeep]);
      const filterByParentCategory = categories.filter(
        (category_child) => category_child?.parent?.name === category?.name
      );
      return (
        <>
          {filterByParentCategory.length === 0 ? (
            <ListItem key={category?.name} sx={{ py: 0 }} dense>
              <ListItemButton
                component={RouterLink}
                to={`item/${toPascalCase(category?.normalizedName)}`}
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
          ) : (
            <>
              <ListItem
                sx={{ py: 0 }}
                key={category?.name}
                secondaryAction={
                  <ListItemButton onClick={handleClickDeep}>
                    {openDeep ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                }
                dense
              >
                <ListItemButton
                  component={RouterLink}
                  to={`item/${toPascalCase(category?.normalizedName)}`}
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
              <Collapse in={openDeep} timeout="auto" unmountOnExit>
                {filterByParentCategory.map((category) => (
                  <ListItem
                    sx={{ py: 0 }}
                    key={`NestedList_${category?.name}`}
                    dense
                  >
                    <ListItemButton
                      component={RouterLink}
                      to={`item/${toPascalCase(category?.normalizedName)}`}
                    >
                      <ListItemText sx={{ pl: 4 }}>
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
          )}
        </>
      );
    };

    return (
      <>
        <ListItem
          sx={{ py: 0 }}
          secondaryAction={
            <ListItemButton onClick={handleClick}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          }
          dense
        >
          <ListItemButton
            component={RouterLink}
            to={`item/${toPascalCase(categoryName)}`}
          >
            <ListItemText
              primary={langDict.ITEM_CATEGORY_NAME[toPascalCase(categoryName)]}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {filterByParentCategory.map((category) => (
              <NestedList category={category} key={category?.name} />
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  type menuTitleProps = {
    titleStr: string;
    isLoading: boolean;
  };

  const MenuTitle = memo(({ titleStr, isLoading }: menuTitleProps) => {
    return (
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchIcon fontSize="large" />
          <Typography variant="h5" pl={1}>
            {titleStr}
          </Typography>
        </Box>
        {isLoading && <LinearProgress color="inherit" />}
      </CardContent>
    );
  });

  return {
    FlatCategory,
    NestedCategory,
    NestedSubcategory,
    langDict,
    categories,
    traders,
    MenuTitle,
  };
};
