import { createBrowserRouter, Navigate, Outlet, type RouteObject } from "react-router-dom";
import Authenticated from "../components/layouts/authenticate";
import MainLayout from "../components/layouts/MainLayout";
import Category from "../pages/category";
import DashboardPage from "../pages/dashBoard";
import CreateProduct from "../pages/Products/createProduct";
import ProductList from "../pages/Products/listProduct";
import UpdateProduct from "../pages/Products/updateProduct";

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <Authenticated fallback={<Navigate to="/signin" replace />}>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </Authenticated>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductList />,
          },
          {
            path: "create", 
            element: <CreateProduct />,
          },
          {
            path: "edit/:id",
            element: <UpdateProduct />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
];
export const router = createBrowserRouter(routes);

export default routes;
