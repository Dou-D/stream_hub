import BaseLayout from "@/layouts/BaseLayout";
import { NotFound } from "@/pages/NotFound";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "user",
        lazy: async () => {
          const { UserProfilePage } = await import("@/pages/user");
          return { Component: UserProfilePage };
        },
        children: [
          {
            index: true,
            element: <Navigate to="videos" replace />,
          },
          {
            path: ":tag",
            lazy: async () => {
              const { UserTagPage } = await import("@/pages/user/tag");
              return { Component: UserTagPage };
            },
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
