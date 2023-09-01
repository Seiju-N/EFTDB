import { ItemCenter } from "@/components/ItemCenter";
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
import LightModeIcon from "@mui/icons-material/LightMode";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { addSign, toPascalCase } from "@/utils";
import { Link as RouterLink } from "react-router-dom";
import { Item } from "@/components/Item";
import LockOpenIcon from "@mui/icons-material/LockOpen";

type Props = {
  currentTask: Task;
  langDict: dictType;
  categories: readonly Maybe<ItemCategory>[] | undefined;
};

export const FinishRewards = ({ currentTask, langDict, categories }: Props) => {
  if (!currentTask.finishRewards) return null;
  return (
    <Card variant="outlined">
      <List sx={{ height: "60vh", overflow: "auto" }} disablePadding>
        <ListSubheader>{langDict.TASK_DETAIL_DIALOG.Rewards}</ListSubheader>
        <Grid container px={2} spacing={1}>
          {
            // TODO: finishRewardsもItemCenter使用する
            currentTask.finishRewards.traderUnlock.map((data, idx) => (
              <ListItem
                sx={{ pl: 4 }}
                key={`${data?.id}_${idx}`}
              >{`Unlock trader ${data?.name}`}</ListItem>
            ))
          }
          {currentTask.finishRewards.traderStanding.map((data, idx) => (
            <Grid item xs={12} md={6} key={`${data?.trader.id}_${idx}`}>
              <ItemCenter>
                <SignalCellularAltIcon fontSize="small" />
                <Typography
                  sx={{
                    alignItems: "center",
                    lineHeight: 1,
                  }}
                  p={0}
                  variant="subtitle2"
                >
                  {data?.trader.name}
                </Typography>
                <Typography
                  sx={{
                    alignItems: "center",
                  }}
                  variant="subtitle1"
                >
                  {addSign(data?.standing)}
                </Typography>
              </ItemCenter>
            </Grid>
          ))}
          {currentTask.finishRewards.skillLevelReward.map((data, idx) => (
            <Grid item xs={12} md={6} key={`${data?.name}_${idx}`}>
              <ItemCenter>
                <LightModeIcon fontSize="small" />
                <Typography
                  sx={{
                    alignItems: "center",
                    lineHeight: 1,
                  }}
                  p={0}
                  variant="subtitle2"
                >
                  {data?.name}
                </Typography>
                <Typography
                  sx={{
                    alignItems: "center",
                  }}
                  variant="subtitle1"
                >
                  {addSign(data?.level)}
                </Typography>
              </ItemCenter>
            </Grid>
          ))}
          {currentTask.finishRewards.items.map((data, idx) => (
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
                    {data?.count && data?.count > 1
                      ? ` (${data?.count})`
                      : null}
                  </Typography>
                </Item>
              </RouterLink>
            </Grid>
          ))}
          {currentTask.finishRewards.offerUnlock.map((data, idx) => (
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
                    alt="Offer unlock item."
                  />
                  <LockOpenIcon
                    fontSize="small"
                    sx={{
                      position: "absolute",
                      top: 2,
                      left: 44,
                    }}
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
      </List>
    </Card>
  );
};
