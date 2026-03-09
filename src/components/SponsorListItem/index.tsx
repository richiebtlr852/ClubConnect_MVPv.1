import type { JSX } from "react";

interface SponsorListItemProps {
  name: string;
  tier: string;
  logo?: string;
}

export function SponsorListItem({ name, tier, logo }: SponsorListItemProps): JSX.Element {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center gap-3">
        {logo !== undefined && logo.length > 0 ? (
          <img src={logo} alt={name} className="w-7 h-7 rounded object-cover shadow" />
        ) : (
          <div className="w-7 h-7 rounded bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">{name.charAt(0)}</span>
          </div>
        )}
        <span className="text-xs text-gray-900">{name}</span>
      </div>
      <span className="text-xs text-gray-500">{tier}</span>
    </div>
  );
}
