import ProductInterface from "../../../types/ProductInterface";

interface Props {
	products: ProductInterface[];
}
const ProductsList = ({ products }: Props): JSX.Element => {
	return <ul>{products[0] ? products.map((e, i) => <li key={i}>{e.name}</li>) : <li>Aucun produits</li>}</ul>;
};

export default ProductsList;
