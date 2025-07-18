import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const GaugeComponent = ({ yesCount, noCount }: { yesCount: number; noCount: number }) => {
  const totalVotes = yesCount + noCount;
  const percentageYes = totalVotes > 0 ? (yesCount / totalVotes) * 100 : 0;

  const settings = {
    width: 260,   // Increased from 200 to 260
    height: 260,  // Increased from 200 to 260
    value: percentageYes,
  };

  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={() => ({
        [`& .${gaugeClasses.valueText}`]: {
          display: "none",
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#5ea500", // bg-lime-600
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: "#fb2c36", // bg-red-500
        },
      })}
    />
  );
};

export default GaugeComponent;