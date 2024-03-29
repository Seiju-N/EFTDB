import { useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Box,
  CircularProgress,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment, memo, SyntheticEvent, useState } from "react";
import type { Query } from "@/graphql/generated";
import { GET_BOSS_SPAWN } from "@/query";
import GroupIcon from "@mui/icons-material/Group";
import { useHooks } from "./hooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { convertPercent } from "@/ItemList/DetailDialog/utils";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export const BossSpawn = memo(() => {
  const { langDict } = useHooks();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string | undefined) =>
    (event: SyntheticEvent, isExpanded: boolean) => {
      if (!panel) return;
      setExpanded(isExpanded ? panel : false);
    };

  const { loading, error, data } = useQuery<Query>(GET_BOSS_SPAWN);
  if (error) return null;
  const Title = memo(() => (
    <Box sx={{ display: "flex", alignItems: "center" }} p={2}>
      <GroupIcon fontSize="medium" />
      <Typography variant="h5" pl={1}>
        {langDict.HOME_SENTENCE.boss_spawns.title}
      </Typography>
    </Box>
  ));
  if (loading || !data)
    return (
      <Paper sx={{ height: 600 }}>
        <Title />
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />
          <Typography variant="h6" pl={2}>
            Loading...
          </Typography>
        </Box>
      </Paper>
    );

  return (
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
      <Title />
      {data.maps.map((map, index) => (
        <Accordion
          expanded={expanded === map?.name}
          onChange={handleChange(map?.name)}
          key={`${map?.name}_${index}`}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "42%",
                flexShrink: 0,
              }}
            >
              {map?.name}
            </Typography>
            <AvatarGroup max={4}>
              {map?.bosses.map((boss, index) => (
                <Tooltip
                  title={boss?.boss.name}
                  key={`${boss?.boss.name}_${index}`}
                >
                  <Avatar src={boss?.boss.imagePortraitLink?.toString()} />
                </Tooltip>
              ))}
            </AvatarGroup>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            {map?.bosses.map((boss, index) => (
              <Fragment key={`${boss?.boss.name}__${index}`}>
                <ListItem key={`${boss?.boss.name}__${index}`}>
                  <ListItemAvatar>
                    <Avatar src={boss?.boss.imagePortraitLink?.toString()} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={boss?.boss.name}
                    primaryTypographyProps={{ variant: "h6" }}
                    secondary={`Chance ${convertPercent(boss?.spawnChance)}`}
                  />
                </ListItem>
                <Grid container pl={2}>
                  {boss?.spawnLocations.map((location, idx) => (
                    <Grid xs={6} key={`${location?.name}_${idx}`}>
                      <ListItemText
                        inset
                        primary={location?.name}
                        secondary={convertPercent(
                          boss?.spawnChance *
                            (location?.chance ? location?.chance : 1)
                        )}
                      />
                    </Grid>
                  ))}
                </Grid>
                {map?.bosses.length - 1 !== index && <Divider />}
              </Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
});
