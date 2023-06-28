import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { CategoryInterface } from "../../../types";

interface Props {
	categories: CategoryInterface[];
	selectCategory: string | null;
	handleChangeCategory: (value: SelectChangeEvent) => void;
	label: string;
	name: string;
}

const MenuSelect = ({ categories, selectCategory, handleChangeCategory, label, name }: Props): JSX.Element => {
	return (
		<FormControl>
			<InputLabel id="categorySelectLabel">{label}</InputLabel>
			<Select
				labelId="categorySelectLabel"
				id="categorySelect"
				value={selectCategory ?? ""}
				label={label}
				name={name}
				onChange={handleChangeCategory}>
				{categories!.map((c, i) => (
					<MenuItem key={i} value={c.id}>
						{c.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default MenuSelect;
