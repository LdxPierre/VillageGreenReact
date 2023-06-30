import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Menu from "./components/Menu";
import { CategoryInterface, HydraCollectionInterface } from "../../types";
import ProductsList from "./components/ProductsList";
import { getProducts } from "../../apis";
import { useFetchCategories } from "../../hooks/useFetchCategories";

const Index = (): JSX.Element => {
  const { categories, loading } = useFetchCategories();
  const [selectCategories, setSelectCategories] = useState<CategoryInterface[]>([]);
  const [products, setProducts] = useState<HydraCollectionInterface | null>(null);
  const [page, setPage] = useState(1);

  const fetchProducts = async (queryParams?: URLSearchParams): Promise<void> => {
    if (queryParams) {
      setProducts(await getProducts(queryParams));
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
        fetchProducts={fetchProducts}
        setPage={setPage}
      ></Menu>
      <Box sx={{ flexGrow: 1 }}>
        {loading && !products ? (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexGrow={1}>
            <CircularProgress />
          </Box>
        ) : null}
        {products ? (
          <ProductsList
            products={products}
            page={page}
            setPage={setPage}
            fetchProducts={fetchProducts}
            loading={loading}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default Index;
