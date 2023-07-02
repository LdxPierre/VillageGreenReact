import PaginationLinks from "./PaginationsLinks";
import { HydraCollectionInterface, ProductInterface, PaginationInterface } from "../../../types";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Props {
  products: HydraCollectionInterface;
  page: number;
  updatePage: (number: number) => void;
  loading: boolean;
}

export const ProductsTable = ({ products, page, updatePage, loading }: Props): JSX.Element => {
  const pagination: PaginationInterface | null = products["hydra:view"];
  const total: number = products["hydra:totalItems"];
  const items: ProductInterface[] = products["hydra:member"];

  return (
    <>
      {pagination?.["hydra:last"] ? (
        <PaginationLinks pagination={pagination} page={page} updatePage={updatePage} total={total}></PaginationLinks>
      ) : null}
      {loading === false ? (
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
                    <Button size="small" variant="contained">
                      Afficher
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: 200 }}>
          <CircularProgress />
        </Box>
      )}
      {pagination?.["hydra:last"] ? (
        <PaginationLinks pagination={pagination} page={page} updatePage={updatePage} total={total}></PaginationLinks>
      ) : null}
    </>
  );
};