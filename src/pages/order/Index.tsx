import OrderArray from "./OrderArray";
import OrderFilter from "./OrderFilter";
import OrderData from "./Order.data";
import { useState } from "react";

interface Props {
	setTitle: (title: string) => void;
}

interface Filters {
	customers: string[];
	sort: string;
	search: string;
}

// set callback func for sort
function sortCB({
	param,
}: {
	param: string;
}): ((a: OrderData, b: OrderData) => 1 | -1 | 0) | undefined {
	switch (param) {
		case "customer asc":
			return (a: OrderData, b: OrderData) => {
				if (
					a.customer.localeCompare(b.customer, undefined, { numeric: true }) > 0
				) {
					return 1;
				} else if (
					a.customer.localeCompare(b.customer, undefined, { numeric: true }) < 0
				) {
					return -1;
				} else {
					return 0;
				}
			};
			break;
		case "customer desc":
			return (a: OrderData, b: OrderData) => {
				if (
					a.customer.localeCompare(b.customer, undefined, { numeric: true }) < 0
				) {
					return 1;
				} else if (
					a.customer.localeCompare(b.customer, undefined, { numeric: true }) > 0
				) {
					return -1;
				} else {
					return 0;
				}
			};
			break;
		case "date asc":
			return (a: OrderData, b: OrderData) => {
				if (a.date > b.date) {
					return 1;
				} else if (a.date < b.date) {
					return -1;
				} else {
					return 0;
				}
			};
			break;
		case "date desc":
			return (a: OrderData, b: OrderData) => {
				if (a.date < b.date) {
					return 1;
				} else if (a.date > b.date) {
					return -1;
				} else {
					return 0;
				}
			};
	}
}

// return list of unique customers
const getCustomersList = (): string[] => {
	return OrderData.reduce((acc, curr) => {
		if (acc.includes(curr.customer) == false) {
			acc.push(curr.customer);
		}
		return acc;
	}, [] as string[]).sort((a: string, b: string) =>
		a.localeCompare(b, undefined, { numeric: true })
	);
};

const Index = ({ setTitle }: Props): JSX.Element => {
	const [data, setData] = useState<OrderData[]>(OrderData);
	const [filters, setFilters] = useState<Filters>({
		customers: [],
		sort: "",
		search: "",
	});

	setTitle("Commandes");

	const applyFilters = (newFilters: Filters): void => {
		let newData = [...OrderData];

		if (newFilters.customers.length != 0) {
			newData = newData.filter((el) =>
				newFilters.customers.includes(el.customer)
			);
		}

		if (newFilters.sort != "") {
			newData = newData.sort(sortCB({ param: newFilters.sort }));
		}

		if (newFilters.search != "") {
			newData = newData.filter(
				(el) =>
					el.customer.match(newFilters.search) || el.id.match(newFilters.search)
			);
		}
		setFilters(newFilters);
		setData(newData);
	};

	return (
		<>
			<OrderFilter
				customers={getCustomersList()}
				applyFilters={applyFilters}
				filters={filters}></OrderFilter>
			<OrderArray orderData={data}></OrderArray>
		</>
	);
};

export default Index;
