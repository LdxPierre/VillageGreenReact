import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { getCategories, getProduct } from "./apis";
import { Login } from "./pages/login/Login";
import { loginAction, productFormEditAction, productFormNewAction } from "./services/actions";
import { mainLoader, productsListLoader } from "./services/loaders";

const Products = lazy(() => import("./pages/products/Products"));
const ProductsList = lazy(() => import("./pages/products/ProductsList"));
const ProductForm = lazy(() => import("./pages/products/ProductForm"));
const Orders = lazy(() => import("./pages/order/Orders"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		loader: mainLoader,
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
						loader: async () => {
							const categories = await getCategories(new URLSearchParams("content=products"));
							return { categories };
						},
						action: productFormNewAction,
					},
					{
						path: "edit/:id",
						element: <ProductForm />,
						loader: async ({ params }) => {
							const product = await getProduct(params.id!);
							const categories = await getCategories(new URLSearchParams("content=products"));
							return {
								product,
								categories,
							};
						},
						action: productFormEditAction,
					},
				],
			},
			{
				path: "orders",
				element: <Orders />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
		action: loginAction,
	},
]);
