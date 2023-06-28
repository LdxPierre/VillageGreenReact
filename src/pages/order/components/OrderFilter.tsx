import { ChangeEvent } from "react";
import {
	Button,
	Checkbox,
	FormControl,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import { OrderInterface, OrderFiltersInterface } from "../../../types";

interface Props {
	customers: string[];
	applyFilters: ({}: OrderFiltersInterface, array?: OrderInterface[] | undefined) => void;
	filters: OrderFiltersInterface;
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

const OrderFilter = ({ customers, applyFilters, filters }: Props): JSX.Element => {
	const handleChangeCustomersFilter = (event: SelectChangeEvent<typeof filters.customers>) => {
		const {
			target: { value },
		} = event;
		applyFilters({
			...filters,
			customers: typeof value === "string" ? value.split(",") : value,
		});
	};

	const handleChangeSort = (event: SelectChangeEvent) => {
		applyFilters({
			...filters,
			sort: event.target.value,
		});
	};

	const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
		applyFilters({
			...filters,
			search: event.target.value,
		});
	};

	const handleClickReset = (): void => {
		applyFilters({ customers: [], sort: "", search: "" });
	};

	return (
		<Grid container alignItems={"center"} sx={{ mb: 3 }} spacing={1}>
			<Grid item>
				<FormControl sx={{ width: 250 }}>
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
			</Grid>
			<Grid item>
				<FormControl sx={{ width: 250 }}>
					<InputLabel id="sortLabel">Trier</InputLabel>
					<Select labelId="sortLabel" id="sort" value={filters.sort} label="Trier" onChange={handleChangeSort}>
						<MenuItem value={"customer asc"}>Client ASC</MenuItem>
						<MenuItem value={"customer desc"}>Client DESC</MenuItem>
						<MenuItem value={"date asc"}>Date de commande ASC</MenuItem>
						<MenuItem value={"date desc"}>Date de commande DESC</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item>
				<TextField
					id="search"
					label="Rechercher"
					variant="outlined"
					onChange={handleChangeSearch}
					sx={{ width: 500 }}></TextField>
			</Grid>
			<Grid item>
				<Button variant="text" color="error" onClick={handleClickReset}>
					Réinitialiser
				</Button>
			</Grid>
		</Grid>
	);
};

export default OrderFilter;
