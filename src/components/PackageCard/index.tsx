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
  Platinum: "bg-[#353e43] text-white",
  Gold: "bg-[#efbf04] text-[#353e43]",
  Silver: "bg-[#c4c4c4] text-[#353e43]",
};

export function PackageCard({
  tier,
  name,
  price,
  benefits,
  sponsors,
}: PackageCardProps): JSX.Element {
  return (
    <div className="border border-[#9ca3af] rounded-lg p-2 sm:p-3 overflow-hidden">
      <div className="flex flex-col gap-2">
        {/* First row: Badge and Name */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`px-2 py-1.5 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0 ${TierColors[tier]}`}
          >
            {tier}
          </span>
          <p className="text-xs sm:text-sm font-normal text-[#374151] truncate">{name}</p>
        </div>

        {/* Second row: Benefits, Sponsors, and Price */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-2 sm:gap-3 text-xs text-[#9ca3af]">
            <span className="whitespace-nowrap">{benefits} Benefits</span>
            <span className="whitespace-nowrap">{sponsors} Sponsors</span>
          </div>
          <p className="text-xs sm:text-sm font-normal text-[#374151] whitespace-nowrap flex-shrink-0">
            {price}
          </p>
        </div>
      </div>
    </div>
  );
}
