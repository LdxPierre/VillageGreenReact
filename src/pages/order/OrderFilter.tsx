import {
	Box,
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import { ChangeEvent } from "react";

interface Filters {
	customers: string[];
	sort: string;
	search: string;
}

interface Props {
	customers: string[];
	applyFilters: ({}: Filters) => void;
	filters: Filters;
	setFilters: ({}: Filters) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const OrderFilter = ({
	customers,
	applyFilters,
	filters,
	setFilters,
}: Props): JSX.Element => {
	const handleChangeCustomersFilter = (
		event: SelectChangeEvent<typeof filters.customers>
	) => {
		const {
			target: { value },
		} = event;
		applyFilters({
			...filters,
			customers: typeof value === "string" ? value.split(",") : value,
		});
		setFilters({
			...filters,
			customers: typeof value === "string" ? value.split(",") : value,
		});
	};

	const handleChangeSort = (event: SelectChangeEvent) => {
		applyFilters({
			...filters,
			sort: event.target.value,
		});
		setFilters({
			...filters,
			sort: event.target.value,
		});
	};

	const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
		applyFilters({
			...filters,
			search: event.target.value,
		});
		setFilters({
			...filters,
			search: event.target.value,
		});
	};

	return (
		<Box>
			<FormControl sx={{ mb: "24px", width: 250 }}>
				<InputLabel id="filterLabel">Filtrer</InputLabel>
				<Select
					labelId="filterLabel"
					id="filterSelect"
					multiple
					onChange={handleChangeCustomersFilter}
					value={filters.customers}
					input={<OutlinedInput label="Filtrer" />}
					renderValue={(select) => select.join(", ")}
					MenuProps={MenuProps}>
					{customers.map((c, i) => (
						<MenuItem key={i} value={c}>
							<Checkbox checked={filters.customers.indexOf(c) > -1}></Checkbox>
							<ListItemText primary={c}></ListItemText>
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{ ml: "8px", width: 250 }}>
				<InputLabel id="sortLabel">Trier</InputLabel>
				<Select
					labelId="sortLabel"
					id="sort"
					value={filters.sort}
					label="Trier"
					onChange={handleChangeSort}>
					<MenuItem value={"customer asc"}>Client ASC</MenuItem>
					<MenuItem value={"customer desc"}>Client DESC</MenuItem>
					<MenuItem value={"date asc"}>Date de commande ASC</MenuItem>
					<MenuItem value={"date desc"}>Date de commande DESC</MenuItem>
				</Select>
			</FormControl>
			<TextField
				id="search"
				label="Rechercher"
				variant="outlined"
				onChange={handleChangeSearch}
				sx={{ ml: "8px", flexGrow: 1 }}></TextField>
		</Box>
	);
};

export default OrderFilter;
