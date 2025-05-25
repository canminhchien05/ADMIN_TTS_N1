import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import ProductsPage from "../pages/Products/Products";
import CategoriesPage from "../pages/Categories/Categories";
import BrandsPage from "../pages/Brands/Brands";
import UsersPage from "../pages/Users/Users";
import BlogsPage from "../pages/Blog/Blog";
import VouchersPage from "../pages/Vouchers/Vouches";
import VariantsPage from "../pages/Variants/Variants";
import AddBlogPage from "../pages/Blog/BlogAdd";
import UpdateBlogPage from "../pages/Blog/BlogUpdate";


export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {path: "products", element: <ProductsPage/> },
      {path: "categories", element: <CategoriesPage/> },
      {path: "brands", element: <BrandsPage/> },
      {path: "users", element: <UsersPage/> },
      {path: "blogs", element: <BlogsPage/> },
      {path: "blogs/add", element: <AddBlogPage/> },
      {path: "blogs/update/:id", element: <UpdateBlogPage/> },
      {path: "vouchers", element: <VouchersPage/> },
      {path: "variants", element: <VariantsPage/> },
    ]
  }
]);
