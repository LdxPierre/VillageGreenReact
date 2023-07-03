import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { productsListLoader } from "./services/loaders/productsLoader";
import { productFormAction } from "./services/actions/productFormAction";

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
						loader: productsListLoader,
					},
					{
						path: "new",
						element: <ProductForm />,
						action: productFormAction,
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
