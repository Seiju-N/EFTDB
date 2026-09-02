import { dictType } from "@/constants/languages/types";
import {
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { NoInfo } from "../NoInfo";
import { LanguageCode, Maybe } from "@/graphql/generated";
import { Category as ItemCategory, Task, TaskObjective } from "@/api/types";
import { Fragment } from "react";
import { Item } from "@/components/Item";
import { toPascalCase } from "@/utils";

type Props = {
  currentTask: Task;
  langDict: dictType;
  categories: readonly Maybe<ItemCategory>[] | undefined;
  lang: LanguageCode;
};

export const TaskObjectives = ({
  currentTask,
  langDict,
  categories,
  lang,
}: Props) => {
  if (!currentTask.objectives) return <NoInfo />;
  const objectives: TaskObjective[] = currentTask.objectives;
  return (
    <Card variant="outlined">
      <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
        <ListSubheader>{langDict.TASK_DETAIL_DIALOG.Objective}</ListSubheader>
        {objectives.map((data, idx) => (
          <Fragment key={`${data?.id}_${idx}`}>
            <ListItem sx={{ px: 4 }} disablePadding>
              <ListItemText>
                {data?.optional ? "(Optional):" : ""}
                {data?.description}
                {data?.count ? `( x ${data?.count} )` : ""}
              </ListItemText>
              {data.item?.id ? (
                <IconButton
                  component={RouterLink}
                  to={`/item/${toPascalCase(
                    categories?.find(
                      (category) => category?.name === data.item?.category?.name
                    )?.normalizedName
                  )}`}
                  state={{ itemId: data.item?.id }}
                  edge="end"
                >
                  <img
                    style={{ height: 40, width: "auto", maxWidth: "100%" }}
                    src={data.item?.iconLink?.toString()}
                    alt="Task objective item"
                  />
                </IconButton>
              ) : null}
            </ListItem>
            {data.attributes?.map((attribute) => {
              const { name, requirement } = attribute || {};
              const { value, compareMethod } = requirement || {};
              const operator = compareMethod
                ? langDict.OPERATORS[compareMethod]
                : "";

              const text =
                lang === "ja"
                  ? `${name} ${value} ${operator}`
                  : `${name} ${operator} ${value}`;

              return (
                <ListItem key={name} dense>
                  <ListItemText inset>{text}</ListItemText>
                </ListItem>
              );
            })}
            {data.containsAll?.map((item) => (
              <ListItem key={item?.id} dense>
                <ListItemText
                  inset
                >{`Required any ${item?.name}`}</ListItemText>
                <IconButton
                  component={RouterLink}
                  to={`/item/${toPascalCase(
                    categories?.find(
                      (category) => category?.name === item?.category?.name
                    )?.normalizedName
                  )}`}
                  state={{ itemId: item?.id }}
                  edge="end"
                >
                  <img
                    style={{
                      height: 40,
                      width: "auto",
                      maxWidth: "100%",
                    }}
                    src={item?.iconLink?.toString()}
                    alt="Task objective item"
                  />
                </IconButton>
              </ListItem>
            ))}
            {data.containsCategory?.map((category) => (
              <ListItem key={category?.name} dense>
                <ListItemText
                  inset
                >{`Required any ${category?.name}`}</ListItemText>
              </ListItem>
            ))}
          </Fragment>
        ))}
        {currentTask.neededKeys?.length !== 0 ? (
          <>
            <ListSubheader>
              {langDict.TASK_DETAIL_DIALOG.NeededKeys}
            </ListSubheader>
            <Grid container px={2} spacing={1}>
              {currentTask.neededKeys?.map((neededKey, idx) =>
                neededKey?.keys?.map((key) => (
                  <Grid item xs={12} md={6} key={`${key?.id}_${idx}`}>
                    <RouterLink
                      to={`/item/${toPascalCase(
                        categories?.find(
                          (category) => category?.name === key?.category?.name
                        )?.normalizedName
                      )}`}
                      state={{ itemId: key?.id }}
                      style={{ textDecoration: "none" }}
                    >
                      <Item>
                        <img
                          style={{
                            height: 50,
                            width: "auto",
                            maxWidth: "100%",
                          }}
                          src={key?.iconLink?.toString()}
                          alt="Task needed key."
                        />
                        <Typography
                          sx={{
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                          }}
                          variant="body1"
                        >
                          {key?.name}
                        </Typography>
                      </Item>
                    </RouterLink>
                  </Grid>
                ))
              )}
            </Grid>
          </>
        ) : null}
      </List>
    </Card>
  );
};
