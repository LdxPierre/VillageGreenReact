import ProductInterface from "../../../types/ProductInterface";

interface Props {
  products: ProductInterface[];
}
const ProductsList = ({ products }: Props): JSX.Element => {
  return <>{products[0] ? products.map((e, i) => <p key={i}>{e.name}</p>) : <li>Aucun produits</li>}</>;
};

export default ProductsList;
