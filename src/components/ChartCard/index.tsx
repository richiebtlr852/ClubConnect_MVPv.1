import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { JSX } from "react";

interface ChartDataPoint {
  month: string;
  thisYear: number;
  lastYear: number;
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  data: ChartDataPoint[];
  maxValue: number;
}

export function ChartCard({ title, subtitle, data, maxValue }: ChartCardProps): JSX.Element {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-normal text-black tracking-[0.5px]">{title}</h3>
          <p className="text-xs text-black opacity-50 mt-0.5 tracking-[0.5px]">{subtitle}</p>
        </div>
        <button
          type="button"
          className="px-3 py-1.5 text-xs text-[#5a6acf] border border-[#5a6acf] rounded hover:bg-indigo-50 transition-colors tracking-[0.5px] flex-shrink-0"
        >
          View Report
        </button>
      </div>

      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#737b8b" }} stroke="#e5e7eb" />
            <YAxis
              domain={[0, maxValue]}
              tick={{ fontSize: 11, fill: "#737b8b" }}
              stroke="#e5e7eb"
              tickFormatter={(value) => `$${String(value / 1000)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                fontSize: "12px",
              }}
              formatter={(value) => `$${String(value)}`}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "5px" }} iconType="circle" />
            <Line
              type="monotone"
              dataKey="thisYear"
              stroke="#5a6acf"
              strokeWidth={2.5}
              dot={false}
              name="This Year"
            />
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#d1d5db"
              strokeWidth={2.5}
              dot={false}
              name="Last Year"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
