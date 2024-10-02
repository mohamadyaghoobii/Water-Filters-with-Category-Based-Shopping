import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPannel";
import AllProducts from "../pages/AllProducts";
import AllUsers from "../pages/AllUsers";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

// Create the router with nested routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main layout component
    children: [
      {
        path: "", // Default child route
        element: <Home /> // Home page component
      },
      {
        path: "login",
        element: <Login /> // Login page component
      },
      {
        path: "sign-up",
        element: <SignUp /> // Sign up page component
      },
      {
        path: "product-category",
        element: <CategoryProduct /> // Product category page component
      },
      {
        path: "product/:id",
        element: <ProductDetails /> // Product details page component
      },
      {
        path: "cart",
        element: <Cart /> // Cart page component
      },
      {
        path: "search",
        element: <SearchProduct /> // Search product page component
      },
      {
        path: "admin-panel",
        element: <AdminPanel />, // Admin panel component
        children: [
          {
            path: "all-products",
            element: <AllProducts /> // All products page within admin panel
          },
          {
            path: "all-users",
            element: <AllUsers /> // All users page within admin panel
          }
        ]
      }
    ]
  }
]);

export default router;
