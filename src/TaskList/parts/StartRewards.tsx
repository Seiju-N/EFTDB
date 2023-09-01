import { dictType } from "@/constants/languages/types";
import { ItemCategory, Maybe, Task } from "@/graphql/generated";
import {
  Card,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from "@mui/material";
import { toPascalCase } from "@/utils";
import { Link as RouterLink } from "react-router-dom";
import { Item } from "@/components/Item";
import { useHooks } from "./hooks";
import { NoInfo } from "../NoInfo";

type Props = {
  currentTask: Task;
  langDict: dictType;
  categories: readonly Maybe<ItemCategory>[] | undefined;
};

export const StartRewards = ({ currentTask, langDict, categories }: Props) => {
  const { isAllArrayElementsEmpty } = useHooks();
  if (
    !currentTask.startRewards ||
    isAllArrayElementsEmpty(currentTask.startRewards)
  )
    return (
      <Card variant="outlined">
        <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
          <ListSubheader>
            {langDict.TASK_DETAIL_DIALOG.StartRewardsItems}
          </ListSubheader>
          <NoInfo />
        </List>
      </Card>
    );
  return (
    <Card variant="outlined">
      <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
        <ListSubheader>
          {langDict.TASK_DETAIL_DIALOG.StartRewardsItems}
        </ListSubheader>
        <Grid container px={2} spacing={1}>
          {currentTask.startRewards.items.map((data, idx) => (
            <Grid item xs={12} md={6} key={`${data?.item.id}_${idx}`}>
              <RouterLink
                to={`/item/${toPascalCase(
                  categories?.find(
                    (category) => category?.name === data?.item.category?.name
                  )?.normalizedName
                )}`}
                state={{ itemId: data?.item.id }}
                style={{ textDecoration: "none" }}
              >
                <Item>
                  <img
                    style={{
                      height: 50,
                      width: "auto",
                      maxWidth: "100%",
                    }}
                    src={data?.item.iconLink?.toString()}
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
                    {data?.item.name}
                  </Typography>
                </Item>
              </RouterLink>
            </Grid>
          ))}
        </Grid>
        {currentTask.startRewards.traderStanding.map((data, idx) => (
          <ListItem
            sx={{ pl: 4 }}
            key={`${data?.trader.id}_${idx}`}
          >{`${data?.trader.name}:${data?.standing}`}</ListItem>
        ))}
      </List>
    </Card>
  );
};
