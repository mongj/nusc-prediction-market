import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const GaugeComponent = ({ yesCount, noCount }) => {
  const totalVotes = yesCount + noCount;
  const percentageYes = totalVotes > 0 ? (yesCount / totalVotes) * 100 : 0;

  const settings = {
    width: 200,
    height: 200,
    value: percentageYes,
  };

  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          display: 'none',
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#52b202',
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: '#ff0000',
        },
      })}
    />
  );
}

export default GaugeComponent