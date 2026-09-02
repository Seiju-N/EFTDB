import { Item } from "@/api/types";
import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { ItemProperties } from "./ItemProperties";
import { useHooks } from "../hooks";
import { CardContentNoPadding } from "@/components/CardContentNoPadding";

type Props = {
  currentItem: Item;
};

export const DetailTab = memo(({ currentItem }: Props) => {
  const { ITEM_DETAIL_DIALOG } = useHooks();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CardContentNoPadding>
        {currentItem.properties && currentItem.properties.propertiesType ? (
          <ItemProperties
            typeName={currentItem.properties.propertiesType}
            ItemId={currentItem.id}
          />
        ) : (
          <Typography>{ITEM_DETAIL_DIALOG.NO_DETAIL}</Typography>
        )}
      </CardContentNoPadding>
    </Box>
  );
});
