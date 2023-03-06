import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { memo, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useHooks } from "./hooks";
import { ServerStatus } from "./ServerStatus";
import { TradersContext } from "../App";
import { TopSubtitle } from "./TopSubtitle";

export const Home = () => {
  const {
    FlatCategory,
    NestedCategory,
    NestedSubcategory,
    langDict,
    categories,
  } = useHooks();

  const TopTitle = () => {
    return (
      <Typography
        sx={{
          fontSize: {
            xs: "1.5rem",
            md: "2.4rem",
          },
        }}
        color="text.secondary"
      >
        {langDict.HOME_SENTENCE.welcome_msg}
      </Typography>
    );
  };

  const Menu = memo(() => {
    const traders = useContext(TradersContext);

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

    return (
      <Grid container>
        <Grid
          xs={12}
          md={6}
          sx={{
            mb: { xs: 2, md: 0 },
            pl: { xs: 0, md: 1 },
            pr: { xs: 0, md: 1 },
          }}
        >
          <Card>
            <MenuTitle
              titleStr={langDict.HOME_SENTENCE.search_item}
              isLoading={categories.length === 0}
            />
            <List component="div">
              <FlatCategory categoryName="Ammo" />
              <FlatCategory categoryName="Armor" />
              <FlatCategory categoryName="Arm band" />
              <FlatCategory categoryName="Backpack" />
              <NestedCategory categoryName="Barter item" />
              <FlatCategory categoryName="Chest rig" />
              <FlatCategory categoryName="Common container" />
              <FlatCategory categoryName="Face Cover" />
              <NestedCategory categoryName="Food and drink" />
              <FlatCategory categoryName="Glasses" />
              <FlatCategory categoryName="Headphones" />
              <FlatCategory categoryName="Helmet" />
              <NestedCategory categoryName="Key" />
              <FlatCategory categoryName="Knife" />
              <NestedCategory categoryName="Meds" />
              <FlatCategory categoryName="Throwable weapon" />
              <NestedSubcategory categoryName="Weapon mod" />
              <NestedCategory categoryName="Weapon" />
            </List>
          </Card>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            mb: { xs: 2, md: 0 },
            pl: { xs: 0, md: 1 },
            pr: { xs: 0, md: 1 },
          }}
        >
          <Card>
            <MenuTitle
              titleStr={langDict.HOME_SENTENCE.search_task}
              isLoading={traders.length === 0}
            />
            <List component="div">
              {traders.map((trader) => (
                <ListItem alignItems="flex-start" key={trader?.name}>
                  <ListItemButton
                    component={RouterLink}
                    to={`task/${trader?.name}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={trader?.name}
                        src={trader?.imageLink || ""}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={trader?.name}
                      primaryTypographyProps={{ fontSize: "1.4rem" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    );
  });

  return (
    <Container>
      <Grid container>
        <Grid xs={12} md={9}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              m: 2,
            }}
          >
            <TopTitle />
            <Typography variant="h3" pl={1}>
              EFTDB.
            </Typography>
          </Box>
          <TopSubtitle />
        </Grid>

        <Grid
          md={3}
          pt={2}
          pb={2}
          pl={1}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <CardMedia
            component="iframe"
            height={400}
            frameBorder={0}
            src="https://discord.com/widget?id=944262508208877569&theme=dark"
          ></CardMedia>
        </Grid>
      </Grid>
      <Grid container columnSpacing={1}>
        <Grid xs={12} md={9}>
          <Menu />
        </Grid>
        <Grid xs={12} md={3}>
          <ServerStatus />
        </Grid>
      </Grid>
    </Container>
  );
};
