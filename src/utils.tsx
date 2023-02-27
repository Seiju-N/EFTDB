import { format, formatDistance } from "date-fns";
import { ja } from "date-fns/locale";

import type { Task, Trader } from "./graphql/generated";

export const formatDate = (date: string) => {
  const formattedDate = formatDistance(new Date(), Date.parse(date), {
    locale: ja,
  });
  if (formattedDate.indexOf("未満") !== -1) {
    return "たった今";
  } else if (
    formattedDate.indexOf("か月") !== -1 ||
    formattedDate.indexOf("年") !== -1
  ) {
    return format(Date.parse(date), "yyyy年M月d日", {
      locale: ja,
    });
  } else {
    return formattedDate + "前";
  }
};

export const titleFormatDate = (date: string) => {
  return format(Date.parse(date), "yyyy年M月d日HH:mm", {
    locale: ja,
  });
};

export type parsedTaskType = {
  trader: Trader;
  tasks: Task[];
};

export const parseData = (dataArr?: Task[]) => {
  if (!dataArr) return null;
  const result: parsedTaskType[] = dataArr.reduce(
    (acc: parsedTaskType[], curr: Task) => {
      const existing = acc.find((item) => item.trader.id === curr.trader.id);
      if (existing) {
        existing.tasks.push(curr);
      } else {
        acc.push({ trader: curr.trader, tasks: [curr] });
      }
      return acc;
    },
    []
  );
  return result;
};

export const normalise = (value: number, MIN = 0, MAX = 100) => {
  return ((value - MIN) * 100) / (MAX - MIN);
};

export const toPascalCase = (str: string | undefined) => {
  if (!str) return "";
  if (str.includes(" ")) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  } else {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }
};
