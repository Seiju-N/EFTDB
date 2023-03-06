import { Box, CardMedia, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { memo } from "react";

import { useHooks } from "./hooks";
import { ServerStatus } from "./ServerStatus";
import { TopSubtitle } from "./TopSubtitle";
import { ItemCategoryList } from "./ItemCategoryList";
import { TaskTraderList } from "./TaskTraderList";

export const Home = () => {
  const { langDict } = useHooks();

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
    return (
      <Grid container>
        <Grid
          xs={12}
          md={6}
          sx={{
            mb: { xs: 2, md: 0 },
            px: { xs: 0, md: 1 },
          }}
        >
          <ItemCategoryList />
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            mb: { xs: 2, md: 0 },
            px: { xs: 0, md: 1 },
          }}
        >
          <TaskTraderList />
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
          py={2}
          pl={1}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <CardMedia
            component="iframe"
            height={400}
            frameBorder={0}
            src="https://discord.com/widget?id=944262508208877569&theme=dark"
          />
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
