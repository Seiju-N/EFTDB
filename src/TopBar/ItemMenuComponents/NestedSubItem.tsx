import { toPascalCase } from "@/utils";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { useHooks } from "../hooks";
import { Fragment, useCallback, useState } from "react";
import { ItemCategory, Maybe } from "@/graphql/generated";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

type props = {
  categoryName: string;
  handleClose: () => void;
};

export const NestedSubItem = ({ categoryName, handleClose }: props) => {
  const { categories, langDict } = useHooks();
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const filterByParentCategory = categories.filter(
    (category) => category?.parent?.name === categoryName
  );

  type nestedListProps = {
    category: Maybe<ItemCategory>;
  };
  const NestedList = ({ category }: nestedListProps) => {
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
          <ListItem key={category?.name} disableGutters disablePadding>
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
              disableGutters
              disablePadding
            >
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
            <Collapse
              in={openDeep}
              timeout="auto"
              unmountOnExit
              sx={{ backgroundColor: "#020202" }}
            >
              {filterByParentCategory.map((category) => (
                <ListItem
                  sx={{ py: 0 }}
                  key={`NestedList_${category?.name}`}
                  disableGutters
                  disablePadding
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
        secondaryAction={
          <ListItemButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        }
        disableGutters
        disablePadding
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
        {filterByParentCategory.map((category, idx) => (
          <Fragment key={idx}>
            <NestedList category={category} />
          </Fragment>
        ))}
      </Collapse>
    </>
  );
};
