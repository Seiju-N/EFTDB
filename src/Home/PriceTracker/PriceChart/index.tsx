import { HistoricalPricePoint, Maybe } from "@/graphql/generated";
import { Typography } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomDot } from "./CustomDot";
import { CustomTooltip } from "./CustomTooltip";
import { useHooks } from "./hooks";
type Props = {
  itemId: string;
};

export const PriceChart = ({ itemId }: Props) => {
  const { formattedData, loading, error, data } = useHooks({ itemId });

  if (loading || !data)
    return (
      <Typography variant="h5" width={"100%"} textAlign={"center"}>
        Loading...
      </Typography>
    );
  if (error) return null;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        style={{ width: "100%", height: 100 }}
        height={200}
        data={formattedData as Maybe<HistoricalPricePoint>[]}
      >
        <XAxis
          dataKey="timestamp"
          label={{
            value: "Time",
            position: "insideBottom",
            offset: -5,
          }}
          tickFormatter={(tick) =>
            new Date(tick).toLocaleString(undefined, {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })
          }
          axisLine={{
            stroke: "#eee",
            strokeWidth: 1,
          }}
        />
        <YAxis
          dataKey="price"
          domain={["auto", "auto"]}
          label={{
            value: "₽",
            offset: -2,
            position: "insideLeft",
          }}
          axisLine={{
            stroke: "#eee",
            strokeWidth: 1,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#888" strokeDasharray="4 4" />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          dot={CustomDot}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
