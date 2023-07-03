import { getCategories } from "../../apis";

export const productsListLoader = async () => {
	return getCategories();
};
