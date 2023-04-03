import { Item } from "@/graphql/generated";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { ItemProperties } from "./ItemProperties";
import { useHooks } from "./hooks";
import { TabPanel } from "@/components/TabPanel";
import { DetailDialogTitle } from "./Title";
import { ItemSize } from "./ItemSize";
import { ItemWeight } from "./ItemWeight";
import { BasePrice } from "./BasePrice";
import { SellPrice } from "./SellPrice";
import { Avg24hPrice } from "./Avg24hPrice";
import { UsedInTasks } from "./UsedInTasks";

type Props = {
  currentItem: Item | undefined;
  dialogOpen: boolean;
  handleDialogClose: () => void;
};

export const DetailDialog = ({
  currentItem,
  dialogOpen,
  handleDialogClose,
}: Props) => {
  const {
    selectedTab,
    handleTabChange,
    ITEM_PROPERTIES_TAB,
    ITEM_DETAIL_DIALOG,
    verticalCenter,
  } = useHooks();
  if (!currentItem) return null;
  const CardContentNoPadding = styled(CardContent)(`
    padding: 16px;
    &:last-child {
      padding-bottom: 16px;
    }
  `);

  const DetailTab = memo(() => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContentNoPadding>
          {currentItem.properties && currentItem.properties.__typename ? (
            <ItemProperties
              typeName={currentItem.properties.__typename}
              ItemId={currentItem.id}
            />
          ) : (
            <Typography>{ITEM_DETAIL_DIALOG.NO_DETAIL}</Typography>
          )}
        </CardContentNoPadding>
      </Box>
    );
  });
  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
      <DetailDialogTitle currentItem={currentItem} />
      {currentItem.image512pxLink ? (
        <Grid sx={verticalCenter}>
          <img
            style={{ height: 120, width: "auto", maxWidth: "100%" }}
            src={currentItem.image512pxLink}
            alt="Item"
          />
        </Grid>
      ) : null}
      <DialogContent>
        <Card variant="outlined">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContentNoPadding>
              <ItemSize currentItem={currentItem} />
              <ItemWeight currentItem={currentItem} />
              <BasePrice currentItem={currentItem} />
              <SellPrice currentItem={currentItem} />
              <Avg24hPrice currentItem={currentItem} />
              <UsedInTasks currentItem={currentItem} />
            </CardContentNoPadding>
          </Box>
        </Card>

        <Card
          variant="outlined"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab label={ITEM_PROPERTIES_TAB.detail} />
            <Tab label={ITEM_PROPERTIES_TAB.unlock_requirement} />
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
            <DetailTab />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <></>
          </TabPanel>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
