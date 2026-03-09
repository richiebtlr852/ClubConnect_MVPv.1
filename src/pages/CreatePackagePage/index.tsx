import { useNavigate } from "react-router";
import type { JSX } from "react";

export function CreatePackagePage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="mb-6">
        <button
          type="button"
          onClick={(): void => {
            void navigate("/packages");
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Packages
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Sponsorship Package</h1>
        <p className="text-sm text-gray-600">
          Define a new sponsorship tier with benefits and pricing
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">Package creation form coming soon...</p>
      </div>
    </div>
  );
}
