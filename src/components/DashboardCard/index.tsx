import type { JSX, ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
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
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      {(title !== undefined && title.length > 0) || action !== undefined ? (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title !== undefined && title.length > 0 && (
              <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            )}
            {subtitle !== undefined && subtitle.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {action !== undefined && <div>{action}</div>}
        </div>
      ) : null}
      {children}
    </div>
  );
}
