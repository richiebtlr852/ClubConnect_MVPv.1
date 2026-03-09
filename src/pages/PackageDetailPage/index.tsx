import { useNavigate, useParams } from "react-router";
import type { JSX } from "react";

export function PackageDetailPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Package Details</h1>
        <p className="text-sm text-gray-600">Package ID: {id}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">Package details coming soon...</p>
      </div>
    </div>
  );
}
