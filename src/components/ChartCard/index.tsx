import type { JSX } from "react";

interface ChartDataPoint {
  month: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  data: ChartDataPoint[];
  maxValue: number;
  showLegend?: boolean;
}

export function ChartCard({
  title,
  subtitle,
  data,
  maxValue,
  showLegend = true,
}: ChartCardProps): JSX.Element {
  const chartHeight = 200;
  const chartWidth = 500;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  const xStep = (chartWidth - padding.left - padding.right) / (data.length - 1);
  const yScale = (chartHeight - padding.top - padding.bottom) / maxValue;

  const points = data
    .map((point, index) => {
      const x = padding.left + index * xStep;
      const y = chartHeight - padding.bottom - point.value * yScale;
      return `${String(x)},${String(y)}`;
    })
    .join(" ");

  const gridLines = [0, 20000, 40000, 60000, 80000];

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <button className="px-3 py-1.5 text-xs text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-50 transition-colors">
          View Report
        </button>
      </div>

      <div className="relative">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {gridLines.map((value) => {
            const y = chartHeight - padding.bottom - value * yScale;
            return (
              <g key={value}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={chartWidth - padding.right}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-400"
                >
                  ${String(value / 1000)}k
                </text>
              </g>
            );
          })}

          <polyline
            points={points}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.map((point, index) => {
            const x = padding.left + index * xStep;
            const y = chartHeight - padding.bottom;
            return (
              <text
                key={point.month}
                x={x}
                y={y + 20}
                textAnchor="middle"
                className="text-xs fill-gray-400"
              >
                {point.month}
              </text>
            );
          })}
        </svg>

        {showLegend && (
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-600" />
              <span className="text-xs text-gray-600">This Year</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-600">Last Year</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
