import OrderInterface from "../../../types/OrderInterface";

let OrderData: OrderInterface[] = [];

const getCustomers = (): string => {
	return "Client #" + (Math.floor(Math.random() * 10) + 1);
};

const getProducts = (): string[] => {
	let productsArray = [];
	const y = Math.floor(Math.random() * 4) + 2;
	for (let i = 1; i < y; i++) {
		productsArray.push("Produit #" + Math.floor(Math.random() * 20));
	}
	return productsArray;
};

const getNewDate = (): Date => {
	const date = new Date(0);
	date.setSeconds(
		Math.floor(Math.random() * (1687171968 - 1371631968) + 1371631968)
	);

	return date;
};

for (let i = 0; i < 200; i++) {
	OrderData.push({
		id: crypto.randomUUID(),
		customer: getCustomers(),
		product: getProducts(),
		status: "En attente",
		date: getNewDate(),
	});
}

export default OrderData;
