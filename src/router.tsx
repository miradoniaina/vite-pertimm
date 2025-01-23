import { createBrowserRouter, redirect } from "react-router-dom";
import GeneralError from "./pages/errors/general-error.tsx";
import NotFoundError from "./pages/errors/not-found-error.tsx";
import MaintenanceError from "./pages/errors/maintenance-error.tsx";
import UnauthorisedError from "./pages/errors/unauthorised-error.tsx";
import { ProtectedRoute } from "./components/protected-route.tsx";

const router = createBrowserRouter([
  // Auth routes
  {
    path: "/sign-in",
    lazy: async () => ({
      Component: (await import("./pages/auth/sign-in/sign-in.container.tsx"))
        .SignInContainer,
    }),
  },
  {
    path: "/register",
    lazy: async () => ({
      Component: (await import("./pages/auth/register/register.container.tsx"))
        .RegisterContainer,
    }),
  },

  // Main routes
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <GeneralError />,
    children: [
      {
        lazy: async () => {
          const AppShell = await import("./components/app-shell-container.tsx");
          return { Component: AppShell.AppShellContainer };
        },
        children: [
          {
            index: true,
            loader: () => redirect("/applications/new"),
          },
          {
            path: "applications",
            children: [
              {
                index: true,
                path: 'new',
                lazy: async () => ({
                  Component: (
                    await import('@/pages/applications/create-application/create-application-container.tsx')
                  ).CreateApplicationContainer,
                }),
              },
              // {
              //   path: ':id',
              //   lazy: async () => ({
              //     Component: (
              //       await import('@/pages/categories/update-category/update-category-container.tsx')
              //     ).UpdateCategoryContainer,
              //   }),
              // },
            ],
          },
        ],
      },
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "/401", Component: UnauthorisedError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
