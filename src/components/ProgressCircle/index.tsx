import { PieChart, Pie, ResponsiveContainer } from "recharts";
import type { JSX } from "react";

interface SegmentData {
  percentage: number;
  color: string;
  label: string;
}

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  segments?: SegmentData[];
}

export function ProgressCircle({
  percentage,
  size = 124,
  strokeWidth = 18,
  segments = [],
}: ProgressCircleProps): JSX.Element {
  // Convert segments to recharts format
  const chartData = segments.map((segment) => ({
    name: segment.label,
    value: segment.percentage,
    fill: segment.color,
  }));

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={String(size / 2 - strokeWidth)}
              outerRadius={String(size / 2)}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-normal text-black tracking-[0.5px]">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}
