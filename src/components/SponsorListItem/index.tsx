import type { JSX } from "react";

interface SponsorListItemProps {
  name: string;
  tier: "Platinum" | "Gold" | "Silver";
  logo?: string;
}

const TierColors = {
  Platinum: "#353E43",
  Gold: "#EFBF04",
  Silver: "#C4C4C4",
};

export function SponsorListItem({ name, tier, logo }: SponsorListItemProps): JSX.Element {
  return (
    <div className="flex items-center justify-between py-3 px-0 border-b border-[#E5E7EB] last:border-b-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {logo !== undefined && logo.length > 0 ? (
          <img
            src={logo}
            alt={name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-medium text-white text-xs"
            style={{ backgroundColor: TierColors[tier] }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-normal text-[#333333] truncate">{name}</span>
      </div>
      <span className="text-xs font-normal text-[#999999] flex-shrink-0 ml-4">{tier}</span>
    </div>
  );
}
