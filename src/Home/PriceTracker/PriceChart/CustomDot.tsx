import { DotProps } from "recharts";

export const CustomDot = (props: DotProps) => {
  const { cx, cy, key } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      stroke="black"
      strokeWidth={1}
      fill={"gray"}
      key={`dot-${key}`}
    />
  );
};
