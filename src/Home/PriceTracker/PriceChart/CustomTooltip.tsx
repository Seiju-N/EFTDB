import { Card, Typography } from "@mui/material";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <Card sx={{ backgroundColor: "rgba(96, 96, 96, 0.6)", p: 1 }}>
        <Typography>{`Price: ${payload[0].value} RUB`}</Typography>
        <Typography>{`Time: ${label}`}</Typography>
      </Card>
    );
  }

  return null;
};
