import { useState } from "react";
import { Box } from "@mui/material";
import Menu from "./components/Menu";
import { CategoryInterface, HydraCollectionInterface } from "../../types";
import { getProducts } from "../../apis";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { ProductsTable } from "./components/ProductsTable";

const ProductsList = (): JSX.Element => {
  const { categories, loading } = useFetchCategories();
  const [selectCategories, setSelectCategories] = useState<CategoryInterface[]>([]);
  const [products, setProducts] = useState<HydraCollectionInterface | null>(null);
  const [page, setPage] = useState(1);

  const updateCategories = (index: number, id: number): void => {
    if (categories?.["hydra:member"]) {
      const cat = categories["hydra:member"].find((c: CategoryInterface) => c.id === id)!;
      const newSelectCategories = [...selectCategories];
      const queryParams = new URLSearchParams(`category=${String(cat.id)}`);
      newSelectCategories.splice(index + 1);
      newSelectCategories[index] = cat;
      cat.content === "products" ? fetchProducts(queryParams) : fetchProducts();
      setSelectCategories(newSelectCategories);
      setPage(1);
    }
  };

  const updatePage = (number: number): void => {
    fetchProducts(new URLSearchParams(`page=${number}`));
    setPage(number);
  };

  const fetchProducts = async (queryParams?: URLSearchParams): Promise<void> => {
    if (queryParams) {
      setProducts(await getProducts(queryParams));
    } else {
      setProducts(null);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "24px" }} position={"relative"}>
      <Menu
        categories={categories?.["hydra:member"]}
        selectCategories={selectCategories}
        updateCategories={updateCategories}
      ></Menu>
      <Box sx={{ flexGrow: 1 }}>
        {products && <ProductsTable products={products} page={page} updatePage={updatePage} loading={loading} />}
      </Box>
    </Box>
  );
};

export default ProductsList;
