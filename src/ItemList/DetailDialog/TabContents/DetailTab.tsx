import { Item } from "@/graphql/generated";
import { Box, CardContent, styled, Typography } from "@mui/material";
import { memo } from "react";
import { ItemProperties } from "./ItemProperties";
import { useHooks } from "../hooks";

type Props = {
  currentItem: Item;
};

const CardContentNoPadding = styled(CardContent)(`
    padding: 16px;
    &:last-child {
      padding-bottom: 16px;
    }
  `);

export const DetailTab = memo(({ currentItem }: Props) => {
  const { ITEM_DETAIL_DIALOG } = useHooks();
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
