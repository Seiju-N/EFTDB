import { HistoricalPricePoint, Maybe, Query } from "@/graphql/generated";
import { GET_ITEM_PRICE_HISTORY } from "@/query";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type Props = {
  itemId: string;
};

export const PriceChart = ({ itemId }: Props) => {
  const { loading, error, data } = useQuery<Query>(GET_ITEM_PRICE_HISTORY, {
    variables: { id: itemId },
  });

  if (loading) return <>Loading...</>;
  if (error || !data) return null;

  const formattedData = data.historicalItemPrices.map((point) => {
    if (!point) return null;
    const timestamp = point.timestamp || "0";
    return {
      ...point,
      timestamp: new Date(parseInt(timestamp)).toLocaleString(),
    };
  });

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ backgroundColor: "rgba(96, 96, 96, 0.6)" }}>
          <p className="label">{`Price:${payload[0].value} RUB`}</p>
          <p className="desc">{`Time: ${label}`}</p>
        </Box>
      );
    }

    return null;
  };

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
        />
        <YAxis
          dataKey="price"
          domain={["auto", "auto"]}
          label={{
            value: "₽",
            offset: -2,
            position: "insideLeft",
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
