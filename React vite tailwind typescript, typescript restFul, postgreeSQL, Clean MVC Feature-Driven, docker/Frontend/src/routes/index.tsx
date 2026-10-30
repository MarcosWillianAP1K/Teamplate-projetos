import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layout";
import { ExemploPage } from "@/features/exemplo";
import { APP_ROUTES } from "./utils/Path";

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ExemploPage />,
      },
      {
        path: APP_ROUTES.EXEMPLO,
        element: <ExemploPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={APP_ROUTES.ROOT} replace />,
  },
]);

export default router;
