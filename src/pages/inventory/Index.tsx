import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Menu from "./components/Menu";
import CategoryInterface from "../../types/CategoryInterface";
import HydraCollectionInterface from "../../types/HydraCollectionInterface";
import ProductsList from "./components/ProductsList";

const Index = (): JSX.Element => {
	const [categories, setCategories] = useState<CategoryInterface[]>([]);
	const [selectCategories, setSelectCategories] = useState<CategoryInterface[]>([]);
	const [products, setProducts] = useState<HydraCollectionInterface | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		let ignore = false;
		const getCategories = async (): Promise<void> => {
			try {
				setLoading(true);
				const response: Response = await fetch("http://localhost:8000/api/categories", {
					headers: {
						Accept: "application/json",
					},
				});
				if (response.ok) {
					const body: CategoryInterface[] | CategoryInterface = await response.json();
					if (ignore === false) {
						Array.isArray(body) ? setCategories(body) : setCategories([body]);
					}
				}
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		getCategories();
		return () => {
			ignore = true;
		};
	}, []);

	const getProducts = async (category?: CategoryInterface, filters?: string): Promise<void> => {
		if (category || filters) {
			let IRI = "http://localhost:8000/api/products";

			if (filters) {
				IRI = `${IRI}?${filters}`;
			} else if (category) {
				IRI = `${IRI}?category=${category.id}`;
			}

			try {
				setLoading(true);
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
			} finally {
				setLoading(false);
			}
		} else {
			setProducts(null);
		}
	};

	return (
		<Box sx={{ display: "flex", gap: "24px" }}>
			<Menu
				categories={categories}
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
