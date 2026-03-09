import type { JSX, ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  subtitle,
  children,
  action,
  className = "",
}: DashboardCardProps): JSX.Element {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          {subtitle !== undefined && subtitle.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {action !== undefined && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}
