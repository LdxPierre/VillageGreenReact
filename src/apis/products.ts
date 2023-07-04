import { getCookie } from "../services/utils";
import { HydraCollectionInterface } from "../types";

const API_URL = "http://localhost:8000/api/products";

export const getProduct = async (id: number | string) => {
	const res: Response = await fetch(`${API_URL}/${id}`, {
		headers: {
			Authorization: `Bearer ${getCookie("token")}`,
		},
	});
	if (res.ok) {
		return await res.json();
	} else {
		throw new Error(`${res.status} ${res.statusText}`);
	}
};

export const getProducts = async (queryParams?: URLSearchParams): Promise<HydraCollectionInterface> => {
	const res: Response = await fetch(`${API_URL}${queryParams ? `?${queryParams}` : ""}`, {
		headers: {
			Authorization: `Bearer ${getCookie("token")}`,
		},
	});
	if (res.ok) {
		return await res.json();
	} else {
		throw new Error(`${res.status} ${res.statusText}`);
	}
};

export const newProduct = async (body: {}) => {
	const values = JSON.stringify(body);
	const res: Response = await fetch(`${API_URL}`, {
		method: "POST",
		body: values,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getCookie("token")}`,
		},
	});
	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}
};

export const editProduct = async (body: {}, id: number | string) => {
	const values = JSON.stringify(body);
	const res: Response = await fetch(`${API_URL}${`/${id}`}`, {
		method: "PATCH",
		body: values,
		headers: {
			"Content-Type": "application/merge-patch+json",
			Authorization: `Bearer ${getCookie("token")}`,
		},
	});
	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}
};
