import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loading } from "../../components";

const Products = (): JSX.Element => {
	return (
		<Suspense fallback={<Loading />}>
			<Outlet />
		</Suspense>
	);
};

export default Products;
