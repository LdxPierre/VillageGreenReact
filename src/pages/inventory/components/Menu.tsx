import { Button, SelectChangeEvent, Stack } from "@mui/material";
import CategoryInterface from "../../../types/CategoryInterface";
import MenuSelect from "./MenuSelect";
import { Add } from "@mui/icons-material";

interface Props {
	categories: CategoryInterface[] | undefined;
	selectCategories: CategoryInterface[];
	setSelectCategories: (categoriesArray: CategoryInterface[]) => void;
	getProducts: (category?: CategoryInterface, filters?: string) => void;
	setPage: (page: number) => void;
}

const Menu = ({ categories, selectCategories, setSelectCategories, getProducts, setPage }: Props): JSX.Element => {
	const handleChangeCategory = (e: SelectChangeEvent): void => {
		const cat = categories!.find((c: CategoryInterface) => c.id === Number(e.target.value))!;
		const selectNbr = Number(e.target.name.replace("category-", "")) - 1;
		const newSelectCategories = [...selectCategories];
		newSelectCategories[selectNbr] = cat;
		newSelectCategories.splice(selectNbr + 1);
		setSelectCategories(newSelectCategories);
		setPage(1);
		cat.content === "products" ? getProducts(cat) : getProducts();
	};

	const inputsCategories = () => {
		if (categories) {
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
		} else {
			return <p>Categories not found</p>;
		}
	};

	return (
		<Stack spacing={2} sx={{ width: 220 }}>
			{inputsCategories()}
			{selectCategories.length > 0 && selectCategories[selectCategories.length - 1].content === "products" ? (
				<Button variant="contained" startIcon={<Add />}>
					Ajouter un produit
				</Button>
			) : null}
		</Stack>
	);
};

export default Menu;
