import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const Products = lazy(() => import("./pages/products/Products"));
const ProductsList = lazy(() => import("./pages/products/ProductsList"));
const ProductForm = lazy(() => import("./pages/products/ProductForm"));
const Orders = lazy(() => import("./pages/order/Orders"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <Products />,
        children: [
          {
            index: true,
            element: <ProductsList />,
          },
          {
            path: "new",
            element: <ProductForm />,
          },
        ],
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);
