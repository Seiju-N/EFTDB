import { usePriceHistory } from "@/api/hooks";

type Props = {
  itemId: string;
}

export const useHooks = ({ itemId }: Props) => {
  const { loading, error, data } = usePriceHistory(itemId);
  const formattedData = data?.historicalItemPrices.map((point) => {
    if (!point) return null;
    const timestamp = point.timestamp || "0";
    return {
      ...point,
      timestamp: new Date(parseInt(timestamp)).toLocaleString(),
    };
  });
  return { formattedData, loading, error, data }
}