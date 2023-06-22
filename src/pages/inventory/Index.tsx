import { useState } from "react";
import CategoriesData from "./Categories.data";
import productsData from "./Products.data";
import Menu from "./components/Menu";
import ProductInterface from "../../types/ProductInterface";
import CategoryInterface from "../../types/CategoryInterface";

interface Filters {
	sort: string;
	brands: string[];
	search: string;
}

const Index = (): JSX.Element => {
	const [selectCategories, setSelectCategories] = useState<CategoryInterface[]>([]);
	const [products, setProducts] = useState<ProductInterface[]>(productsData);
	const [productFilters, setProductFilters] = useState<Filters>({ sort: "nameASC", brands: [], search: "" });

	const applyFilters = (newFilters: Filters) => {
		const filteredProducts: ProductInterface[] = [...products];

		// if (filter.sort) {
		// filteredProducts.sort(sortCB(filter.sort));
		// }

		// if (filter.brands.length > 0) {
		// filteredProducts.filter((e) => filter.brands.includes(e.brand));
		// }

		// if (filter.search != "") {
		// filteredProducts.filter((e) => e.name.match(filter.search) || e.brand.match(filter.search));
		// }

		setProducts(filteredProducts);
		setProductFilters(newFilters);
	};

	return (
		<>
			<Menu
				categories={CategoriesData}
				products={products}
				filters={productFilters}
				applyFilters={applyFilters}
				selectCategories={selectCategories}
				setSelectCategories={setSelectCategories}></Menu>
		</>
	);
};

export default Index;
