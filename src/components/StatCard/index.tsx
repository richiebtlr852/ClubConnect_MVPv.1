import type { JSX, ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: ReactNode;
  valueColor?: string;
}

export function StatCard({
  label,
  value,
  trend,
  icon,
  valueColor = "text-green-600",
}: StatCardProps): JSX.Element {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-700 mb-1">{label}</p>
        <p className={`text-xl font-medium ${valueColor}`}>{value}</p>
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            {trend.isPositive && (
              <svg
                className="w-3 h-3 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            )}
            <span className="text-xs text-green-600 font-semibold">{trend.value}</span>
            <span className="text-xs text-gray-500">vs last year</span>
          </div>
        )}
      </div>
      {icon !== undefined && <div className="ml-4">{icon}</div>}
    </div>
  );
}
