import { RouteObject, redirect } from "react-router-dom";
import { editProduct } from "../../apis";

interface Param {
	params: RouteObject;
	request: Request;
}

export const productFormEditAction = async ({ request }: Param) => {
	const values = Object.fromEntries(await request.formData());
	const { id, ...body } = values;
	const newValues = { ...body, stock: Number(values.stock) };
	try {
		editProduct(newValues, Number(id));
	} catch (e) {
		throw new Error("Error on editProduct");
	}
	return redirect("/products");
};
