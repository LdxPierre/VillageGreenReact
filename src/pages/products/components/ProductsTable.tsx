import PaginationLinks from "./PaginationsLinks";
import { HydraCollectionInterface, ProductInterface, PaginationInterface } from "../../../types";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface Props {
	products: HydraCollectionInterface;
	page: number;
	updatePage: (number: number) => void;
}

export const ProductsTable = ({ products, page, updatePage }: Props): JSX.Element => {
	const pagination: PaginationInterface | null = products["hydra:view"];
	const total: number = products["hydra:totalItems"];
	const items: ProductInterface[] = products["hydra:member"];

	return (
		<>
			<PaginationLinks pagination={pagination} page={page} updatePage={updatePage} total={total}></PaginationLinks>
			<TableContainer component={Paper}>
				<Table aria-label="Products">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Nom</TableCell>
							<TableCell align="right">Marque</TableCell>
							<TableCell align="right">Stock</TableCell>
							<TableCell align="right">Prix</TableCell>
							<TableCell align="right">Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map((p) => (
							<TableRow key={p.id} hover>
								<TableCell component={"th"} scope="row">
									{p.id}
								</TableCell>
								<TableCell>{p.name}</TableCell>
								<TableCell align="right">{p.brand}</TableCell>
								<TableCell align="right">{p.stock}</TableCell>
								<TableCell align="right">{p.price}</TableCell>
								<TableCell align="right">
									<Button component={RouterLink} to={`edit/${p.id}`} size="small" variant="contained">
										Afficher
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{pagination?.["hydra:last"] ? (
				<PaginationLinks pagination={pagination} page={page} updatePage={updatePage} total={total}></PaginationLinks>
			) : null}
		</>
	);
};
