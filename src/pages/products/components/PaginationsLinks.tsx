import { Box, Pagination, Stack, Typography } from "@mui/material";
import { PaginationInterface } from "../../../types";

interface Props {
	pagination: PaginationInterface | null;
	page: number;
	updatePage: (number: number) => void;
	total: number;
}

const PaginationLinks = ({ pagination, page, updatePage, total }: Props): JSX.Element => {
	const lastPage = pagination?.["hydra:last"]
		? Number(pagination["hydra:last"].charAt(pagination["hydra:last"].length - 1))
		: null;

	const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
		if (value != page) {
			updatePage(value);
		}
	};

	return (
		<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
			<Typography sx={{ py: 1 }}>Total de produits : {total}</Typography>
			<Stack spacing={2} direction={"row"} justifyContent={"flex-end"} sx={{ paddingY: 1 }}>
				{pagination?.["hydra:last"] ? (
					<Pagination count={lastPage ?? 1} page={page} onChange={handleChangePage} />
				) : null}
			</Stack>
		</Box>
	);
};

export default PaginationLinks;
