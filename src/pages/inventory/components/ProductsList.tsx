import PaginationInterface from "../../../types/PaginationInterface";
import ProductInterface from "../../../types/ProductInterface";
import PaginationLinks from "../../../components/PaginationsLinks";
import CategoryInterface from "../../../types/CategoryInterface";
import { CircularProgress } from "@mui/material";

interface Props {
  products: ProductInterface[];
  pagination: PaginationInterface | null;
  page: number;
  setPage: (page: number) => void;
  getProducts: (category?: CategoryInterface, filters?: string) => void;
  loading: boolean;
}

const ProductsList = ({ products, pagination, getProducts, loading, page, setPage }: Props): JSX.Element => {
  return (
    <>
      {pagination?.["hydra:last"] ? (
        <PaginationLinks
          pagination={pagination}
          getProducts={getProducts}
          page={page}
          setPage={setPage}
        ></PaginationLinks>
      ) : null}
      {loading ? <CircularProgress /> : null}
      {products[0] && !loading ? products.map((e, i) => <p key={i}>{e.name}</p>) : null}
    </>
  );
};

export default ProductsList;
