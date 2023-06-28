import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	TextField,
	MenuItem,
	Button,
} from "@mui/material";
import { ChangeEvent } from "react";
import { ProductInterface } from "../../../types";

interface Filters {
	sort: string;
	brands: string[];
	search: string;
}

interface Props {
	filters: Filters;
	applyFilters: (filters: Filters) => void;
	products: ProductInterface[];
	resetFilters: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 220,
		},
	},
};

const MenuFilters = ({ filters, applyFilters, products, resetFilters }: Props): JSX.Element => {
	const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
		applyFilters({ ...filters, search: e.target.value });
	};

	const handleChangeBrands = (e: SelectChangeEvent<typeof filters.brands>): void => {
		const {
			target: { value },
		} = e;
		applyFilters({ ...filters, brands: typeof value === "string" ? value.split(",") : value });
	};

	const handleChangeSort = (e: SelectChangeEvent): void => {
		applyFilters({ ...filters, sort: e.target.value });
	};

	const handleClickReset = () => {
		resetFilters();
	};

	const getUniqueBrands = (products: ProductInterface[]): string[] => {
		return products.reduce((acc: string[], curr: ProductInterface) => {
			!acc.includes(curr.brand) ? acc.push(curr.brand) : null;
			return acc;
		}, []);
	};

	return (
		<>
			<TextField
				id="SearchProducts"
				label="Rechercher"
				variant="outlined"
				onChange={handleChangeSearch}
				value={filters.search}
			/>
			<FormControl>
				<InputLabel id="SelectProductsBrandsLabel">Marque</InputLabel>
				<Select
					labelId="SelectProductsBrandsLabel"
					id="SelectProductsBrands"
					multiple
					value={filters.brands}
					onChange={handleChangeBrands}
					input={<OutlinedInput label="Marque" />}
					renderValue={(selected) => selected.join(", ")}
					MenuProps={MenuProps}>
					{getUniqueBrands(products).map((e, i) => (
						<MenuItem key={i} value={e}>
							<Checkbox checked={filters.brands.indexOf(e) > -1} />
							<ListItemText primary={e} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel id="SelectProductsSortLabel">Trier</InputLabel>
				<Select
					labelId="SelectProductsSortLabel"
					id="SelectProductsSort"
					value={filters.sort}
					onChange={handleChangeSort}
					input={<OutlinedInput label="Trier" />}
					MenuProps={MenuProps}>
					<MenuItem value={"nameASC"}>Nom ASC</MenuItem>
					<MenuItem value={"nameDESC"}>Nom DESC</MenuItem>
					<MenuItem value={"priceASC"}>Prix ASC</MenuItem>
					<MenuItem value={"priceDESC"}>Prix DESC</MenuItem>
				</Select>
			</FormControl>
			<Button color="error" onClick={handleClickReset}>
				Réinitialiser
			</Button>
		</>
	);
};

export default MenuFilters;
