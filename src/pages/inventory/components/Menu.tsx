import { Button, Divider, SelectChangeEvent, Stack, Typography } from "@mui/material";
import CategoryInterface from "../../../types/CategoryInterface";
import ProductInterface from "../../../types/ProductInterface";
import MenuSelect from "./MenuSelect";
import { Add } from "@mui/icons-material";
import MenuFilters from "./MenuFilters";
import { Fragment } from "react";

interface Props {
  categories: CategoryInterface[];
  products: ProductInterface[];
  filters: Filters;
  applyFilters: (filter: Filters) => void;
  selectCategories: CategoryInterface[];
  setSelectCategories: (categoriesArray: CategoryInterface[]) => void;
  getProducts: (category: CategoryInterface | null) => void;
  resetFilters: () => void;
}

interface Filters {
  sort: string;
  brands: string[];
  search: string;
}

const Menu = ({
  categories,
  products,
  selectCategories,
  setSelectCategories,
  getProducts,
  filters,
  applyFilters,
  resetFilters,
}: Props): JSX.Element => {
  const handleChangeCategory = (e: SelectChangeEvent): void => {
    const cat = categories.find((c: CategoryInterface) => c.id === Number(e.target.value))!;
    const selectNbr = Number(e.target.name.replace("category-", "")) - 1;
    const newSelectCategories = [...selectCategories];
    newSelectCategories[selectNbr] = cat;
    newSelectCategories.splice(selectNbr + 1);
    setSelectCategories(newSelectCategories);
    resetFilters();
    cat.content === "products" ? getProducts(cat) : getProducts(null);
  };

  const inputsCategories = () => {
    const inputsArray: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
      inputsArray.push(
        <MenuSelect
          key={i}
          categories={
            // find main categories
            // find childrens categories from parent
            i === 0
              ? categories.filter((c) => (c.parent ? false : true))
              : categories.filter((c) => c.parent && c.parent.id === selectCategories[i - 1].id)
          }
          selectCategory={selectCategories[i] ? String(selectCategories[i].id) : ""}
          handleChangeCategory={handleChangeCategory}
          label={`Catégorie ${i + 1}`}
          name={`category-${i + 1}`}
        />
      );
      selectCategories[i] && selectCategories[i].content === "categories" ? null : (i = 11);
    }
    return inputsArray;
  };

  return (
    <Stack spacing={2} sx={{ width: 220 }}>
      <Typography>Sélectionner une catégorie</Typography>
      {inputsCategories()}
      {selectCategories.length > 0 && selectCategories[selectCategories.length - 1].content === "products" ? (
        <Fragment>
          <Divider />
          <Button variant="contained" startIcon={<Add />}>
            Ajouter un produit
          </Button>
          <MenuFilters
            filters={filters}
            applyFilters={applyFilters}
            products={products}
            resetFilters={resetFilters}
          ></MenuFilters>
        </Fragment>
      ) : null}
    </Stack>
  );
};

export default Menu;
