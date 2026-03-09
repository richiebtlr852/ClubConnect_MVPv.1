import type { JSX } from "react";

export function InvitePage(): JSX.Element {
  return (
    <div className="bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sponsor Invitations</h1>
        <p className="text-sm text-gray-600">
          Send invitations to potential sponsors and track their responses
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500">Invitation management coming soon...</p>
      </div>
    </div>
  );
}
