interface OrderData {
	id: string;
	name: string;
	product: string;
}

let OrderData: OrderData[] = [];

for (let i = 0; i < 50; i++) {
	OrderData.push({
		id: crypto.randomUUID(),
		name: `Order #${i}`,
		product: `Product #${i}`,
	});
}

export default OrderData;
