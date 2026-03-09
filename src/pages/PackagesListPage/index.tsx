import { useNavigate } from "react-router";
import type { JSX } from "react";

export function PackagesListPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sponsorship Packages</h1>
            <p className="text-sm text-gray-600">
              Manage your club&apos;s sponsorship tiers and benefits
            </p>
          </div>
          <button
            type="button"
            onClick={(): void => {
              void navigate("/packages/create");
            }}
            className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-brand-blue transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Package
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">Package management coming soon...</p>
      </div>
    </div>
  );
}
