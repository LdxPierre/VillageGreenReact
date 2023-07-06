import { useLoaderData, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import { CategoryInterface, HydraCollectionInterface } from "../../types";
import Menu from "./components/Menu";
import { ProductsTable } from "./components/ProductsTable";

interface LoaderDataInterface {
	categories: HydraCollectionInterface;
	products: HydraCollectionInterface;
	selectCategories: CategoryInterface[];
	params: URLSearchParams;
}

const ProductsList = (): JSX.Element => {
	const { categories, products, selectCategories, params } = useLoaderData() as LoaderDataInterface;
	const [searchParams, setSearchParams] = useSearchParams(params);

	const updateCategories = (index: number, id: number): void => {
		if (categories?.["hydra:member"]) {
			const oldSelectCategory = searchParams.getAll("selectCategory").splice(0, index);
			searchParams.delete("page");
			searchParams.delete("selectCategory");
			oldSelectCategory.map((c) => searchParams.append("selectCategory", c));
			searchParams.append("selectCategory", String(id));
			setSearchParams(searchParams);
		}
	};

	const updatePage = (number: number): void => {
		setSearchParams((prev) => {
			prev.set("page", String(number));
			return prev;
		});
	};

	const updateSearch = (value: string): void => {
		setSearchParams((prev) => {
			prev.set("name", value);
			return prev;
		});
	};

	const updateSort = (value: string): void => {
		setSearchParams((prev) => {
			prev.set("sort", value);
			return prev;
		});
	};
	return (
		<Box sx={{ display: "flex", gap: "24px" }} position={"relative"}>
			<Menu
				categories={categories?.["hydra:member"]}
				selectCategories={selectCategories}
				updateCategories={updateCategories}
				params={searchParams}
				updateSearch={updateSearch}
				updateSort={updateSort}></Menu>
			<Box sx={{ flexGrow: 1 }}>
				{products && (
					<ProductsTable products={products} page={Number(searchParams.get("page") ?? 1)} updatePage={updatePage} />
				)}
			</Box>
		</Box>
	);
};

export default ProductsList;
