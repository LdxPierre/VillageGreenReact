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
	const fetchParams = new URLSearchParams();
	if (queryParams) {
		queryParams.has("selectCategory") &&
			fetchParams.append("category", queryParams.getAll("selectCategory").reverse()[0]);
		queryParams.has("page") && fetchParams.append("page", queryParams.get("page")!);
		queryParams.has("name") && fetchParams.append("name", queryParams.get("name")!);
		if (queryParams.has("sort")) {
			queryParams.get("sort") === "idASC" && fetchParams.append("order[id]", "asc");
			queryParams.get("sort") === "idDESC" && fetchParams.append("order[id]", "desc");
			queryParams.get("sort") === "nameASC" && fetchParams.append("order[name]", "asc");
			queryParams.get("sort") === "nameDESC" && fetchParams.append("order[name]", "desc");
			queryParams.get("sort") === "brandASC" && fetchParams.append("order[brand]", "asc");
			queryParams.get("sort") === "brandDESC" && fetchParams.append("order[brand]", "desc");
			queryParams.get("sort") === "stockASC" && fetchParams.append("order[stock]", "asc");
			queryParams.get("sort") === "stockDESC" && fetchParams.append("order[stock]", "desc");
			queryParams.get("sort") === "priceASC" && fetchParams.append("order[price]", "asc");
			queryParams.get("sort") === "priceDESC" && fetchParams.append("order[price]", "desc");
		}
	}

	const res: Response = await fetch(`${API_URL}?${fetchParams}`, {
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
