import { App } from "./app";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CreatePackagePage } from "./pages/CreatePackagePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ErrorPage } from "./pages/ErrorPage";
import { InvitePage } from "./pages/InvitePage";
import { LoginPage } from "./pages/LoginPage";
import { PackageDetailPage } from "./pages/PackageDetailPage";
import { PackagesListPage } from "./pages/PackagesListPage";
import { SignUpPage } from "./pages/SignUpPage";
import { createBrowserRouter } from "react-router";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        // Ref: https://reactrouter.com/start/data/routing#index-routes
        // Ref: https://reactrouter.com/start/data/routing#configuring-routes
        index: true,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "packages",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <PackagesListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "create",
            element: (
              <ProtectedRoute>
                <CreatePackagePage />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <PackageDetailPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "invites",
        element: (
          <ProtectedRoute>
            <InvitePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
