import { createBrowserRouter, Navigate, Outlet, type RouteObject } from "react-router-dom";
import Authenticated from "../components/layouts/authenticate";
import DashboardPage from "../pages/dashBoard";
import CreateProduct from "../pages/Products/createProduct";
import ProductList from "../pages/Products/listProduct";
import UpdateProduct from "../pages/Products/updateProduct";
import ListBrand from "../pages/Brands/listBrand";
import CreateBrand from "../pages/Brands/createBrand";
import ListCategory from "../pages/Categories/listCategory";
import CreateCategory from "../pages/Categories/createCategory";
import UpdateCategory from "../pages/Categories/updateCategory";
import MainLayout from "../components/layouts/MainLayout";
import UpdateBrand from "../pages/Brands/updateBrand";
import SearchPage from "../pages/Search/search";
import ProductVariantList from "../pages/ProductsVariant/listVariant";
import CreateProductVariant from "../pages/ProductsVariant/createVarinant";
import UpdateProductVariant from "../pages/ProductsVariant/updateVariant";

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
        children:[
          {
            index:true,
            element:<ListCategory/>
          },
          {
            path: "create",
            element: <CreateCategory />,
          },
          {
            path: "edit/:id",
            element: <UpdateCategory />,
          }
        ]
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
      {
        path:"brands",
        children:[
          {
            index:true,
            element:<ListBrand/>
          },
          {
            path: "create",
            element: <CreateBrand />,
          },
          {
            path: "edit/:id",
            element: <UpdateBrand />,
          }
        ]
      },
      {
        path: "search",
        children:[
          {
            index: true,
            element: <SearchPage />,
          }
        ]
      },
      {
        path: "variants",
        children: [
          {
            index: true,
            element: <ProductVariantList/>
          },
          {
            path: "create",
            element: <CreateProductVariant />,
          },
          {
            path: "edit/:id",
            element: <UpdateProductVariant />,
          }
        ]
      }
    ],
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
];
export const router = createBrowserRouter(routes);

export default routes;
