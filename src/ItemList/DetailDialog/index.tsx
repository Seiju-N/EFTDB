import { Item } from "@/graphql/generated";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Card, Dialog, DialogContent, Tab, Tabs } from "@mui/material";
import { useHooks } from "./hooks";
import { TabPanel } from "@/components/TabPanel";
import { DetailDialogTitle } from "./Title";
import { ItemSize } from "./ItemSize";
import { ItemWeight } from "./ItemWeight";
import { BasePrice } from "./BasePrice";
import { SellPrice } from "./SellPrice";
import { Avg24hPrice } from "./Avg24hPrice";
import { UsedInTasks } from "./UsedInTasks";
import { DetailTab } from "./TabContents/DetailTab";
import { UnlockRequirement } from "./TabContents/UnlockRequirement";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import InfoIcon from "@mui/icons-material/Info";
import { CardContentNoPadding } from "@/components/CardContentNoPadding";

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
  const { selectedTab, handleTabChange, ITEM_PROPERTIES_TAB, verticalCenter } =
    useHooks();
  if (!currentItem) return null;

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
          sx={{ display: "flex", flexDirection: "column", minHeight: 200 }}
        >
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab
              label={ITEM_PROPERTIES_TAB.detail}
              icon={<InfoIcon sx={{ height: 20 }} />}
              iconPosition="start"
              sx={{ minHeight: "48px" }}
            />
            <Tab
              label={ITEM_PROPERTIES_TAB.unlock_requirement}
              icon={<LockOpenIcon sx={{ height: 20 }} />}
              iconPosition="start"
              sx={{ minHeight: "48px" }}
            />
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
            <DetailTab currentItem={currentItem} />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <UnlockRequirement currentItem={currentItem} />
          </TabPanel>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
