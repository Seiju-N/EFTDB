import { useQuery } from "@apollo/client";
import {
  Avatar,
  AvatarGroup,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Fragment, memo, useState } from "react";
import type { Map, Maybe, Query } from "@/graphql/generated";
import { GET_BOSS_SPAWN } from "@/query";
import GroupIcon from "@mui/icons-material/Group";
import { useHooks } from "./hooks";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { convertPercent } from "@/ItemList/utils";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

type props = {
  map: Maybe<Map>;
};

export const BossSpawn = memo(() => {
  const { langDict } = useHooks();
  const { loading, error, data } = useQuery<Query>(GET_BOSS_SPAWN);
  if (loading || error || !data) return null;
  console.log(data);

  const BossSpawnListItem = memo(({ map }: props) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <>
        <ListItemButton onClick={handleClick}>
          <>
            <ListItemText
              sx={{ pl: 2 }}
              primary={map?.name}
              primaryTypographyProps={{ variant: "h6" }}
            />
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
            {open ? <ExpandLess /> : <ExpandMore />}
          </>
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {map?.bosses.map((boss, index) => (
              <>
                <ListItem key={`${boss?.boss.name}__${index}`}>
                  <ListItemAvatar sx={{ pl: 4 }}>
                    <Avatar src={boss?.boss.imagePortraitLink?.toString()} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ pl: 2 }}
                    primary={boss?.boss.name}
                    primaryTypographyProps={{ variant: "h6" }}
                    secondary={`Chance ${convertPercent(boss?.spawnChance)}`}
                  />
                  <Grid container pl={10}>
                    {boss?.spawnLocations.map((location, idx) => (
                      <Grid xs={6} md={6} key={`${location?.name}_${idx}`}>
                        <ListItemText
                          inset
                          primary={location?.name}
                          secondary={convertPercent(location?.chance)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </ListItem>
              </>
            ))}
          </List>
        </Collapse>
      </>
    );
  });
  return (
    <Paper sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center" }} p={2}>
        <GroupIcon fontSize="medium" />
        <Typography variant="h5" pl={1}>
          {langDict.HOME_SENTENCE.boss_spawns.title}
        </Typography>
      </Box>
      <List>
        {data.maps.map((map, index) => (
          <Fragment key={index}>
            <BossSpawnListItem map={map} />
          </Fragment>
        ))}
      </List>
    </Paper>
  );
});
