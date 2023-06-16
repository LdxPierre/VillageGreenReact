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
import { ChangeEvent, useState } from "react";

interface Props {
	searchOrder: (value: string) => void;
}

const filter = ["Filtre #1", "Filtre #2", "Filtre #3"];
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

const OrderFilter = ({ searchOrder }: Props): JSX.Element => {
	const [filterName, setFilterName] = useState<string[]>([]);
	const [sort, setSort] = useState<string>("");

	const handleChangeFilter = (event: SelectChangeEvent<typeof filterName>) => {
		const {
			target: { value },
		} = event;
		setFilterName(typeof value === "string" ? value.split(",") : value);
	};

	const handleChangeSort = (event: SelectChangeEvent) => {
		setSort(event.target.value as string);
	};

	const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
		searchOrder(event.currentTarget.value);
	};

	return (
		<Box>
			<FormControl sx={{ mb: "24px", width: 200 }}>
				<InputLabel id="filterLabel">Filtrer</InputLabel>
				<Select
					labelId="filterLabel"
					id="filterSelect"
					multiple
					onChange={handleChangeFilter}
					value={filterName}
					input={<OutlinedInput label="Filtrer" />}
					renderValue={(select) => select.join(", ")}
					MenuProps={MenuProps}>
					{filter.map((f, i) => (
						<MenuItem key={i} value={f}>
							<Checkbox checked={filterName.indexOf(f) > -1}></Checkbox>
							<ListItemText primary={f}></ListItemText>
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{ ml: "8px", width: 200 }}>
				<InputLabel id="sortLabel">Trier</InputLabel>
				<Select
					labelId="sortLabel"
					id="sort"
					value={sort}
					label="Trier"
					onChange={handleChangeSort}>
					<MenuItem value={"ASC"}>Date ASC</MenuItem>
					<MenuItem value={"DESC"}>Date DESC</MenuItem>
				</Select>
			</FormControl>
			<TextField
				id="search"
				label="Rechercher"
				variant="outlined"
				onChange={handleChangeSearch}
				sx={{ ml: "8px", width: 300 }}></TextField>
		</Box>
	);
};

export default OrderFilter;
