import { Box, Pagination, Stack, Typography } from "@mui/material";
import PaginationInterface from "../types/PaginationInterface";
import CategoryInterface from "../types/CategoryInterface";

interface Props {
	pagination: PaginationInterface;
	getProducts: (category?: CategoryInterface, filters?: string) => void;
	page: number;
	setPage: (page: number) => void;
	total: number;
}

const PaginationLinks = ({ pagination, getProducts, page, setPage, total }: Props): JSX.Element => {
	const lastPage = Number(pagination["hydra:last"].charAt(pagination["hydra:last"].length - 1));

	const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
		if (value != page) {
			const IRI = new URL(`http://localhost:8000/${pagination["@id"]}`);
			IRI.searchParams.set("page", String(value));
			setPage(value);
			getProducts(undefined, IRI.searchParams.toString());
		}
	};

	return (
		<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
			<Typography>Total de produits : {total}</Typography>
			<Stack spacing={2} direction={"row"} justifyContent={"flex-end"} sx={{ paddingY: 1 }}>
				<Pagination count={lastPage} page={page} onChange={handleChangePage} />
			</Stack>
		</Box>
	);
};

export default PaginationLinks;
