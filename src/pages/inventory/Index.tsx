import { useEffect, useState } from "react";
import CategoriesData from "./Categories.data";
import productsData from "./Products.data";
import Menu from "./components/Menu";
import ProductInterface from "../../types/ProductInterface";
import CategoryInterface from "../../types/CategoryInterface";
import ProductsList from "./components/ProductsList";
import { Box } from "@mui/material";

interface Filters {
	sort: string;
	brands: string[];
	search: string;
}

const sortCB = (sort: string) => {
	switch (sort) {
		case "nameASC": {
			return (a: ProductInterface, b: ProductInterface): 1 | -1 | 0 => {
				const result = a.name.localeCompare(b.name, undefined, { numeric: true });
				if (result > 0) {
					return 1;
				} else if (result < 0) {
					return -1;
				} else {
					return 0;
				}
			};
			break;
		}
		case "nameDESC": {
			return (a: ProductInterface, b: ProductInterface): 1 | -1 | 0 => {
				const result = a.name.localeCompare(b.name, undefined, { numeric: true });
				if (result < 0) {
					return 1;
				} else if (result > 0) {
					return -1;
				} else {
					return 0;
				}
			};
			break;
		}
		case "priceASC": {
			return (a: ProductInterface, b: ProductInterface): 1 | -1 | 0 => {
				if (a.price > b.price) {
					return 1;
				} else if (a.price < b.price) {
					return -1;
				} else {
					return 0;
				}
			};
			break;
		}
		case "priceDESC": {
			return (a: ProductInterface, b: ProductInterface): 1 | -1 | 0 => {
				if (a.price < b.price) {
					return 1;
				} else if (a.price > b.price) {
					return -1;
				} else {
					return 0;
				}
			};
			break;
		}
	}
};

const Index = (): JSX.Element => {
	const [categories, setCategories] = useState<CategoryInterface[]>([]);
	const [selectCategories, setSelectCategories] = useState<CategoryInterface[]>([]);
	const [products, setProducts] = useState<ProductInterface[]>([]);
	const [productsAfterFilters, setProductsAfterFilters] = useState<ProductInterface[] | null>(null);
	const [productFilters, setProductFilters] = useState<Filters>({ sort: "nameASC", brands: [], search: "" });

	useEffect(() => {
		setCategories(CategoriesData);
	}, []);

	const getProducts = (category: CategoryInterface | null) => {
		resetFilters();
		if (category) {
			setProducts(productsData.filter((e) => e.category_id === category.id));
		} else {
			setProducts([]);
		}
	};

	const applyFilters = (newFilters: Filters) => {
		let filteredProducts: ProductInterface[] = [...products];

		if (newFilters.search != "") {
			filteredProducts = filteredProducts.filter(
				(e) => e.name.match(newFilters.search) || e.brand.match(newFilters.search) || e.id.match(newFilters.search)
			);
		}

		if (newFilters.brands[0]) {
			filteredProducts = filteredProducts.filter((e) => newFilters.brands.includes(e.brand));
		}

		if (newFilters.sort != "") {
			filteredProducts = filteredProducts.sort(sortCB(newFilters.sort));
		}

		setProductsAfterFilters(filteredProducts);
		setProductFilters(newFilters);
	};

	const resetFilters = (): void => {
		setProductFilters({ sort: "nameASC", brands: [], search: "" });
		setProductsAfterFilters(null);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<Menu
				categories={categories}
				products={products}
				filters={productFilters}
				applyFilters={applyFilters}
				resetFilters={resetFilters}
				selectCategories={selectCategories}
				setSelectCategories={setSelectCategories}
				getProducts={getProducts}></Menu>
			<Box>
				{selectCategories.length > 0 && !selectCategories[selectCategories.length - 1].children[0] ? (
					<ProductsList products={productsAfterFilters ? productsAfterFilters : products} />
				) : null}
			</Box>
		</Box>
	);
};

export default Index;
