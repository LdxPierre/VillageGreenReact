import { CategoryInterface } from ".";

export interface ProductInterface {
	id?: number;
	category: CategoryInterface;
	name: string;
	url: string;
	brand: string;
	price: number;
	stock: number;
}
