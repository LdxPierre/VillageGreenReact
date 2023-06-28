import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Menu from "./components/Menu";
import { CategoryInterface, HydraCollectionInterface } from "../../types";
import ProductsList from "./components/ProductsList";
import { useFetchData } from "../../hooks";

const Index = (): JSX.Element => {
	const { data: categories, loading } = useFetchData({
		pathname: "categories",
	});
	const [selectCategories, setSelectCategories] = useState<CategoryInterface[]>([]);
	const [products, setProducts] = useState<HydraCollectionInterface | null>(null);
	const [page, setPage] = useState(1);

	const getProducts = async (category?: CategoryInterface, filters?: string): Promise<void> => {
		if (category || filters) {
			let IRI = "http://localhost:8000/api/products";

			if (filters) {
				IRI = `${IRI}?${filters}`;
			} else if (category) {
				IRI = `${IRI}?category=${category.id}`;
			}

			try {
				const response: Response = await fetch(IRI, {
					headers: { Accept: "application/ld+json" },
				});
				if (response.ok) {
					const body: HydraCollectionInterface = await response.json();
					setProducts(body);
				} else {
					throw new Error("Products request has failed");
				}
			} catch (e) {
				console.error(e);
			}
		} else {
			setProducts(null);
		}
	};

	return (
		<Box sx={{ display: "flex", gap: "24px" }}>
			<Menu
				categories={categories?.["hydra:member"]}
				selectCategories={selectCategories}
				setSelectCategories={setSelectCategories}
				getProducts={getProducts}
				setPage={setPage}></Menu>
			<Box sx={{ flexGrow: 1 }}>
				{loading && !products ? (
					<Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexGrow={1}>
						<CircularProgress />
					</Box>
				) : null}
				{products ? (
					<ProductsList products={products} page={page} setPage={setPage} getProducts={getProducts} loading={loading} />
				) : null}
			</Box>
		</Box>
	);
};

export default Index;
