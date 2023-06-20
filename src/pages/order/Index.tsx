import { useState } from "react";
import OrderFilter from "./OrderFilter";
import OrderArray from "./OrderArray";
import OrderData from "./Order.data";
import OrderInterface from "../../types/OrderInterface";
import OrderFiltersInterface from "../../types/OrderFiltersInterface";

// set callback func for sort
function sortCB(
	param: string
): ((a: OrderInterface, b: OrderInterface) => 0 | 1 | -1) | undefined {
	switch (param) {
		case "customer asc":
			return (a: OrderInterface, b: OrderInterface) => {
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
			return (a: OrderInterface, b: OrderInterface) => {
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
			return (a: OrderInterface, b: OrderInterface) => {
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
			return (a: OrderInterface, b: OrderInterface) => {
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
const getCustomersList = (array: OrderInterface[]): string[] => {
	return array
		.reduce((acc, curr) => {
			if (acc.includes(curr.customer) == false) {
				acc.push(curr.customer);
			}
			return acc;
		}, [] as string[])
		.sort((a: string, b: string) =>
			a.localeCompare(b, undefined, { numeric: true })
		);
};

const Index = (): JSX.Element => {
	const [originalData, setOriginalData] = useState<OrderInterface[]>(OrderData);
	const [data, setData] = useState<OrderInterface[]>(OrderData);
	const [filters, setFilters] = useState<OrderFiltersInterface>({
		customers: [],
		sort: "",
		search: "",
	});

	const applyFilters = (
		newFilters: OrderFiltersInterface,
		array: OrderInterface[] = originalData
	): void => {
		let newData = [...array];

		if (newFilters.customers.length != 0) {
			newData = newData.filter((el) =>
				newFilters.customers.includes(el.customer)
			);
		}

		if (newFilters.sort != "") {
			newData = newData.sort(sortCB(newFilters.sort));
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

	const customersList: string[] = getCustomersList(originalData);

	return (
		<>
			<OrderFilter
				customers={customersList}
				applyFilters={applyFilters}
				filters={filters}></OrderFilter>
			<OrderArray orderData={data}></OrderArray>
		</>
	);
};

export default Index;
