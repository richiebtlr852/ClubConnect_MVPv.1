import type { JSX } from "react";

interface PackageCardProps {
  tier: "Platinum" | "Gold" | "Silver";
  name: string;
  price: string;
  benefits: number;
  sponsors: number;
  isActive?: boolean;
}

const TierColors = {
  Platinum: "bg-gray-700 text-white border-gray-700",
  Gold: "bg-yellow-accent text-gray-700 border-gray-700",
  Silver: "bg-gray-300 text-gray-700 border-gray-700",
};

export function PackageCard({
  tier,
  name,
  price,
  benefits,
  sponsors,
  isActive = false,
}: PackageCardProps): JSX.Element {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <span className={`px-3 py-1 rounded text-xs font-medium ${TierColors[tier]}`}>
            {tier}
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-gray-500">{benefits} Benefits</span>
              <span className="text-xs text-gray-500">{sponsors} Sponsors</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600">{price}</p>
          {isActive && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-green-600 text-white text-xs rounded">
              {sponsors} Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
