import { Button, Divider, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { CategoryInterface } from "../../../types";
import MenuSelect from "./MenuSelect";
import { MenuSelectSort } from "./MenuSelectSort";
import { ChangeEvent } from "react";

interface Props {
	categories: CategoryInterface[] | undefined;
	selectCategories: CategoryInterface[];
	updateCategories: (index: number, id: number) => void;
	params: URLSearchParams;
	updateSearch: (value: string) => void;
	updateSort: (value: string) => void;
}

const Menu = ({
	categories,
	selectCategories,
	updateCategories,
	params,
	updateSearch,
	updateSort,
}: Props): JSX.Element => {
	const handleChangeCategory = (e: SelectChangeEvent): void => {
		const index = Number(e.target.name.replace("category-", "")) - 1;
		updateCategories(index, Number(e.target.value));
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		updateSearch(e.target.value);
	};

	const handleChangeSort = (e: SelectChangeEvent) => {
		updateSort(e.target.value);
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
		<Stack spacing={2} sx={{ width: 220, minWidth: 220, left: 0, top: 0 }} position={"sticky"}>
			<Button component={RouterLink} to={"/products/new"} variant="contained" startIcon={<Add />}>
				Ajouter un produit
			</Button>
			<Divider />
			<TextField id="search" label="Rechercher" defaultValue={params.get("name")} onChange={handleSearchChange} />
			<Divider />
			<MenuSelectSort
				label={""}
				selectSort={params.get("sort") ?? "idASC"}
				name="sort"
				handleChangeSort={handleChangeSort}
			/>
			<Divider />
			{inputsCategories()}
		</Stack>
	);
};

export default Menu;
