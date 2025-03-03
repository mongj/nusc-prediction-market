export type ChipColor = "green" | "blue" | "red" | "yellow" | "gray";

interface ChipProps {
  text: string;
  color: ChipColor;
  className?: string;
}

const textColorMap = {
  green: "text-lime-600",
  blue: "text-sky-500",
  red: "text-red-500",
  yellow: "text-amber-500",
  gray: "text-neutral-500",
};

const bgColorMap = {
  green: "bg-lime-100",
  blue: "bg-sky-100",
  red: "bg-red-100",
  yellow: "bg-amber-100",
  gray: "bg-neutral-100",
};

function Chip(props: ChipProps) {
  const textColor = textColorMap[props.color];
  const bgColor = bgColorMap[props.color];
  return <div className={`rounded-full px-3 py-1 ${bgColor} ${textColor}`}>{props.text}</div>;
}

export default Chip;
