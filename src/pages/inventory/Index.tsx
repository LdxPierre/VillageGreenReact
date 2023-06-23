import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import ProductInterface from "../../types/ProductInterface";
import CategoryInterface from "../../types/CategoryInterface";
import ProductsList from "./components/ProductsList";
import { Box, CircularProgress } from "@mui/material";

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
  const [loading, setLoading] = useState<boolean>(false);

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

  const getProducts = async (category: CategoryInterface | null): Promise<void> => {
    if (category) {
      setLoading(true);
      resetFilters();
      try {
        const response: Response = await fetch(`http://localhost:8000/api/products?category=${category.id}`, {
          headers: { Accept: "application/json" },
        });
        if (response.ok) {
          const body: ProductInterface[] | ProductInterface = await response.json();
          Array.isArray(body) ? setProducts(body) : setProducts([body]);
        } else {
          throw new Error("Products request has failed");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else {
      setProducts([]);
    }
  };

  const applyFilters = (newFilters: Filters): void => {
    let filteredProducts: ProductInterface[] = [...products];

    if (newFilters.search != "") {
      filteredProducts = filteredProducts.filter(
        (e) =>
          e.name.match(newFilters.search) || e.brand.match(newFilters.search) || String(e.id).match(newFilters.search)
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
    <Box sx={{ display: "flex", gap: "24px" }}>
      <Menu
        categories={categories}
        products={products}
        filters={productFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        selectCategories={selectCategories}
        setSelectCategories={setSelectCategories}
        getProducts={getProducts}
      ></Menu>
      <Box sx={{ flexGrow: 1 }}>
        {loading === false &&
        selectCategories.length > 0 &&
        selectCategories[selectCategories.length - 1].content === "products" ? (
          <ProductsList products={productsAfterFilters ? productsAfterFilters : products} />
        ) : null}
        {loading ? <CircularProgress /> : null}
      </Box>
    </Box>
  );
};

export default Index;
