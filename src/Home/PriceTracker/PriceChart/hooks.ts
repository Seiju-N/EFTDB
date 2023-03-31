import { Query } from "@/graphql/generated";
import { GET_ITEM_PRICE_HISTORY } from "@/query";
import { useQuery } from "@apollo/client";

type Props = {
  itemId: string;
}

export const useHooks = ({ itemId }: Props) => {
  const { loading, error, data } = useQuery<Query>(GET_ITEM_PRICE_HISTORY, {
    variables: { id: itemId },
  });
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