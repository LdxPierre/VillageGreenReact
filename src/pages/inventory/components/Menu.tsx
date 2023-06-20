import { useState } from "react";
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import CategoryInterface from "../../../types/CategoryInterface";

interface Props {
	categories: CategoryInterface[];
}

const getMainCategories = (array: CategoryInterface[]): CategoryInterface[] =>
	array.filter((c) => c.parent_id === null);

const Menu = ({ categories }: Props): JSX.Element => {
	const [selectCategories, setSelectCategories] = useState<[string]>([""]);
	const [categoryHasChildren, setCategoryHasChildren] =
		useState<boolean>(false);

	const handleChangeCategory = (e: SelectChangeEvent): void => {
		setSelectCategories([e.target.value]);
		categories.filter((c) => c.id === e.target.value)[0].children
			? setCategoryHasChildren(true)
			: setCategoryHasChildren(false);
	};

	return (
		<Box>
			<FormControl sx={{ width: 200 }}>
				<InputLabel id="categorySelectLabel">Catégorie 1</InputLabel>
				<Select
					labelId="categorySelectLabel"
					id="categorySelect"
					value={selectCategories[0]}
					label="Catégorie 1"
					onChange={handleChangeCategory}>
					{getMainCategories(categories).map((c, i) => (
						<MenuItem key={i} value={c.name}>
							{c.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default Menu;
