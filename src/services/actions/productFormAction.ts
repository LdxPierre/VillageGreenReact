import { RouteObject, redirect } from "react-router-dom";
import { newProduct } from "../../apis";

interface Param {
	params: RouteObject;
	request: Request;
}

export const productFormAction = async ({ request }: Param): Promise<Response> => {
	const values = Object.fromEntries(await request.formData());
	const url: string = `${values.brand} ${values.name}`.toLowerCase().replaceAll(" ", "-");
	const newValues = { ...values, stock: Number(values.stock), url };
	try {
		newProduct(newValues);
	} catch (e) {
		console.error(e);
	}
	return redirect("/products");
};
