import { BarChart } from "@mui/x-charts/BarChart";
import { prepareDataForPlot } from "./GraphCertificationResults";
import PhiusLimitLine from "./LimitLine";

export function GraphPeakLoad(graphProps: {
  data: any[];
  chartSettings: any;
  limits: { heating: number; cooling: number };
}) {
  if (graphProps.data.length < 3) {
    return <div>No Data.</div>;
  }

  const dataByDatedResult = prepareDataForPlot(graphProps.data);

  return (
    <BarChart
      dataset={dataByDatedResult}
      series={[
        {
          dataKey: "PEAK HEAT LOAD",
          label: "Heating",
          stack: "A",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "PEAK COOLING LOAD [SENSIBLE]",
          label: "Sensible Cooling",
          stack: "B",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "PEAK COOLING LOAD [LATENT]",
          label: "Latent Cooling",
          stack: "B",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
      ]}
      {...graphProps.chartSettings}
      yAxis={[{ ...graphProps.chartSettings.yAxis[0], max: 1500000 }]}
      colors={[
        "#CB6D69", // Heating
        "#82B2D9", // Cooling
        "#aecfe8", // Dehumidification Override
      ]}
    >
      <PhiusLimitLine value={graphProps.limits.heating} type="heating" />
      <PhiusLimitLine value={graphProps.limits.cooling} type="cooling" />
    </BarChart>
  );
}
