import { Suspense, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Loading } from "../../components";
import { UserContext } from "../../context";

const Products = (): JSX.Element => {
	const user = useContext(UserContext);
	console.log(user);
	return (
		<Suspense fallback={<Loading />}>
			<Outlet />
		</Suspense>
	);
};

export default Products;
