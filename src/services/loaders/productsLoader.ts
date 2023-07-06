import { getCategories, getProducts } from "../../apis";
import { CategoryInterface } from "../../types";

export const productsListLoader = async ({ request }: { request: Request }) => {
	const currentURL = new URL(request.url);
	const params = currentURL.searchParams;
	const categories = await getCategories();
	const selectCategories: CategoryInterface[] = categories["hydra:member"].filter((c) =>
		params.getAll("selectCategory").includes(String(c.id))
	);
	const products = await getProducts(params);

	return { categories, products, selectCategories, params };
};
