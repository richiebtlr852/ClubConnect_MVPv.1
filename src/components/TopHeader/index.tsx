import { useGetClubByUserId } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { signOutUser } from "../../services";
import { useNavigate } from "react-router";
import type { JSX } from "react";

export function TopHeader(): JSX.Element {
  const { user } = useAuth();
  const { data: clubDetails } = useGetClubByUserId(user?.uid);
  const navigate = useNavigate();

  const handleSignOut = (): void => {
    const signOut = async (): Promise<void> => {
      try {
        await signOutUser();
        void navigate("/login");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };
    void signOut();
  };

  const userInitials =
    user?.email !== null && user?.email !== undefined
      ? user.email
          .split("@")[0]
          .split(".")
          .map((part) => part.charAt(0).toUpperCase())
          .join("")
          .slice(0, 2)
      : "U";

  return (
    <header className="h-[88px] bg-[#edeff3] border-b border-gray-200 fixed top-0 right-0 left-[276px] z-10 shadow-sm">
      <div className="h-full flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          {clubDetails !== null && clubDetails !== undefined && (
            <>
              <div className="w-[71px] h-[71px] bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-700">
                  {clubDetails.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-normal text-[#273240]">{clubDetails.name}</h2>
                {clubDetails.suburb.length > 0 && (
                  <p className="text-sm text-gray-500">{clubDetails.suburb}</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Search"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
            aria-label="Notifications"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="relative group">
            <button
              type="button"
              className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-sm hover:bg-indigo-700 transition-colors"
              aria-label="User menu"
            >
              {userInitials}
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="py-1">
                <button
                  type="button"
                  onClick={(): void => {
                    handleSignOut();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
