import { FormControl, FormLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface PropsInterface {
	label: string;
	selectSort: string;
	name: string;
	handleChangeSort: (e: SelectChangeEvent) => void;
}

export const MenuSelectSort = ({ label, selectSort, name, handleChangeSort }: PropsInterface): JSX.Element => {
	return (
		<FormControl>
			<FormLabel id="selectSortLabel">{label}</FormLabel>
			<Select
				labelId="selectSortLabel"
				id="selectSort"
				value={selectSort ?? "idASC"}
				label={label}
				name={name}
				onChange={handleChangeSort}>
				<MenuItem value="idASC">ID ASC</MenuItem>
				<MenuItem value="idDESC">ID DESC</MenuItem>
				<MenuItem value="nameASC">Nom ASC</MenuItem>
				<MenuItem value="nameDESC">Nom DESC</MenuItem>
				<MenuItem value="brandASC">Marque ASC</MenuItem>
				<MenuItem value="brandDESC">Marque DESC</MenuItem>
				<MenuItem value="stockASC">Stock ASC</MenuItem>
				<MenuItem value="stockDESC">Stock DESC</MenuItem>
				<MenuItem value="priceASC">Price ASC</MenuItem>
				<MenuItem value="priceDESC">Price DESC</MenuItem>
			</Select>
		</FormControl>
	);
};
