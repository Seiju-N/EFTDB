import React, { useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ReactComponent as Discord } from "@/img/discord.svg";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export const UserPage = () => {
  const [canReload, setCanReload] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCanReload(false);
    }, 10000);
  }, [canReload]);
  const handleReload = () => {
    setCanReload(true);
  };
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "left", height: 160 }}>
        <Box sx={{ px: 2, py: 4 }}>
          <Avatar variant="rounded" sx={{ height: 96, width: 96 }}>
            <Discord height={60} />
          </Avatar>
        </Box>
        <Box sx={{ px: 2, py: 4, flexGrow: 1 }}>
          <Box>
            <Typography variant="h4">User Name</Typography>
          </Box>
          <Box>
            <Typography variant="h6">User ID</Typography>
          </Box>
        </Box>
        <Box sx={{ px: 2, py: 4 }}>
          <Button
            variant="contained"
            startIcon={<AutorenewIcon />}
            disabled={canReload}
            onClick={handleReload}
          >
            Reload
          </Button>
        </Box>
      </Box>
      <Divider />
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        value={"one"}
      >
        <Tab value="one" label="プレイヤーデータ" />
        <Tab value="two" label="戦績1" />
        <Tab value="three" label="戦績2" />
      </Tabs>
      <Box sx={{ height: 600 }}>
        <List>
          <ListItem>
            <ListItemText
              primary="マッチ #1234"
              secondary="Factory"
              primaryTypographyProps={{ variant: "h5" }}
              secondaryTypographyProps={{ variant: "h6" }}
            />
            <ListItemText primary="Kill: 7" secondary="PMC: 3, Scav: 4" />
          </ListItem>
          <Divider />
          <ListItem sx={{ display: "flex" }}>
            <ListItemText
              primary="マッチ #1234"
              secondary="Customs"
              primaryTypographyProps={{ variant: "h5" }}
              secondaryTypographyProps={{ variant: "h6" }}
              sx={{ flexGrow: 1 }}
            />
            <ListItemText primary="Kill: 7" secondary="PMC: 5, Scav: 2" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="マッチ #1234"
              secondary="Factory"
              primaryTypographyProps={{ variant: "h5" }}
              secondaryTypographyProps={{ variant: "h6" }}
            />
            <ListItemText primary="Kill: 5" secondary="PMC: 5, Scav: 0" />
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Container>
  );
};
