import OrderArray from "./OrderArray";
import OrderFilter from "./OrderFilter";
import OrderData from "./Order.data";
import { useState } from "react";

interface Props {
	setTitle: (title: string) => void;
}

const Index = ({ setTitle }: Props): JSX.Element => {
	const [data, setData] = useState(OrderData);

	const searchOrder = (value: string) => {
		setData(
			OrderData.filter((el) => {
				if (el.name.match(value) || el.id.match(value)) {
					return true;
				} else {
					return false;
				}
			})
		);
	};

	setTitle("Commandes");
	return (
		<>
			<OrderFilter searchOrder={searchOrder}></OrderFilter>
			<OrderArray orderData={data}></OrderArray>
		</>
	);
};

export default Index;
