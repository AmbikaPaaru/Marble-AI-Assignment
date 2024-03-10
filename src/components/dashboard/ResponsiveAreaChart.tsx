import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { IChartDatum } from "../../interfaces";
import DateRangeDisplay from "./DateRangeDisplay";

type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveAreaChart = ({
  kpi,
  data,
  colors,
}: TResponsiveAreaChartProps) => {
  return (
    <ResponsiveContainer height={150}>
      <AreaChart
        data={data}
        height={150}
        margin={{
          top: 0,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="0 0 0" /> */}
        <XAxis
          dataKey="date"
          tickCount={data?.length ?? 0}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
          axisLine={false}
          tickLine={false}
          style={{ margin: "20px 0 -30px 0" }}
        />
        <YAxis
          tickCount={13}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0,
            fontSize: "12px",
          }}
          interval="preserveStartEnd"
          domain={[0, "dataMax + 10"]}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const { date } = payload[0].payload;

              return (
                <div className="custom-tooltip p-2 text-[12px] bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[180px]">
                  <DateRangeDisplay
                    content1={
                      <span>
                        {payload[0]?.payload?.date}&nbsp; &nbsp;{" "}
                        {payload[0]?.payload?.value1}
                      </span>
                    }
                    content={
                      <span>
                        {payload[0]?.payload?.date}&nbsp; &nbsp;{" "}
                        {payload[0]?.value}
                      </span>
                    }
                    bg={false}
                    textColor="rgba(48,48,48,1)"
                  />
                </div>
              );
            }
            return null;
          }}
          wrapperStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "0 solid #000",
            borderRadius: "10px",
          }}
        />

        <Area
          type="monotone"
          dataKey="value"
          strokeDasharray="10 8"
          stroke={"rgba(72,154,210,0.2)"}
          strokeWidth={2}
          fill={colors?.fill}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="value1"
          // Adding dashed line style
          stroke={colors?.stroke}
          strokeWidth={2}
          fill={colors?.fill}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
