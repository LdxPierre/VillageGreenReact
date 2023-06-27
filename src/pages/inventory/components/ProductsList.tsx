import PaginationInterface from "../../../types/PaginationInterface";
import ProductInterface from "../../../types/ProductInterface";
import PaginationLinks from "../../../components/PaginationsLinks";
import CategoryInterface from "../../../types/CategoryInterface";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface Props {
	products: ProductInterface[];
	pagination: PaginationInterface | null;
	page: number;
	setPage: (page: number) => void;
	getProducts: (category?: CategoryInterface, filters?: string) => void;
	loading: boolean;
}

const ProductsList = ({ products, pagination, getProducts, page, setPage }: Props): JSX.Element => {
	return (
		<>
			{pagination?.["hydra:last"] ? (
				<PaginationLinks
					pagination={pagination}
					getProducts={getProducts}
					page={page}
					setPage={setPage}></PaginationLinks>
			) : null}
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
						{products.map((p) => (
							<TableRow key={p.id} hover>
								<TableCell component={"th"} scope="row">
									{p.id}
								</TableCell>
								<TableCell>{p.name}</TableCell>
								<TableCell align="right">{p.brand}</TableCell>
								<TableCell align="right">{p.stock}</TableCell>
								<TableCell align="right">{p.price}</TableCell>
								<TableCell align="right">
									<Button size="small" variant="contained">
										Afficher
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{pagination?.["hydra:last"] ? (
				<PaginationLinks
					pagination={pagination}
					getProducts={getProducts}
					page={page}
					setPage={setPage}></PaginationLinks>
			) : null}
		</>
	);
};

export default ProductsList;
