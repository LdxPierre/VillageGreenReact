import { Button, Divider, SelectChangeEvent, Stack, Typography } from "@mui/material";
import CategoryInterface from "../../../types/CategoryInterface";
import ProductInterface from "../../../types/ProductInterface";
import MenuSelect from "./MenuSelect";
import { Add } from "@mui/icons-material";

interface Props {
	categories: CategoryInterface[];
	products: ProductInterface[];
	filters: Filters;
	applyFilters: (filter: Filters) => void;
	selectCategories: CategoryInterface[];
	setSelectCategories: (categoriesArray: CategoryInterface[]) => void;
}

interface Filters {
	sort: string;
	brands: string[];
	search: string;
}

const Menu = ({ categories, selectCategories, setSelectCategories }: Props): JSX.Element => {
	const handleChangeCategory = (e: SelectChangeEvent): void => {
		const cat = categories.find((c: CategoryInterface) => c.id === e.target.value)!;
		const selectNbr = Number(e.target.name.replace("category-", "")) - 1;
		const newSelectCategories = [...selectCategories];
		newSelectCategories[selectNbr] = cat;
		newSelectCategories.splice(selectNbr + 1);
		setSelectCategories(newSelectCategories);
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
							? categories.filter((c) => c.parent_id === null)
							: categories.filter((c) => c.parent_id === selectCategories[i - 1].id)
					}
					selectCategory={selectCategories[i] ? selectCategories[i].id : ""}
					handleChangeCategory={handleChangeCategory}
					label={`Catégorie ${i + 1}`}
					name={`category-${i + 1}`}
				/>
			);
			selectCategories[i] && selectCategories[i].children[0] ? null : (i = 11);
		}
		return inputsArray;
	};

	return (
		<Stack spacing={2} sx={{ width: 220 }}>
			<Typography>Sélectionner une catégorie</Typography>
			{inputsCategories()}
			{selectCategories.length > 0 && !selectCategories[selectCategories.length - 1].children[0] ? (
				<>
					<Divider />
					<Button variant="contained" startIcon={<Add />}>
						Ajouter un produit
					</Button>
				</>
			) : null}
		</Stack>
	);
};

export default Menu;
