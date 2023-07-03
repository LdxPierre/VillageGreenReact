import { Button, SelectChangeEvent, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { CategoryInterface } from "../../../types";
import MenuSelect from "./MenuSelect";

interface Props {
	categories: CategoryInterface[] | undefined;
	selectCategories: CategoryInterface[];
	updateCategories: (index: number, id: number) => void;
}

const Menu = ({ categories, selectCategories, updateCategories }: Props): JSX.Element => {
	const handleChangeCategory = (e: SelectChangeEvent): void => {
		const index = Number(e.target.name.replace("category-", "")) - 1;
		updateCategories(index, Number(e.target.value));
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
		}
	};

	return (
		<Stack spacing={2} sx={{ width: 220, left: 0, top: 0 }} position={"sticky"}>
			<Button component={RouterLink} to={"/products/new"} variant="contained" startIcon={<Add />}>
				Ajouter un produit
			</Button>
			{inputsCategories()}
		</Stack>
	);
};

export default Menu;
