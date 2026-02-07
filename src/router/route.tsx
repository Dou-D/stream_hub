import BaseLayout from "@/layouts/BaseLayout";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    element: <BaseLayout />,
    // children: [
    //     {
    //         path: "/",
    //         element: <Home />,
    //     },
    // ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
