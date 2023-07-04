import { HydraCollectionInterface } from "../types";

const API_URL = "http://localhost:8000/api/products";
const ApiAuthToken =
	"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODg0NjAwOTYsImV4cCI6MTY4ODQ2MzY5Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdEB0ZXN0LmZyIn0.ep9CgKrq5ai1M84Bhk8Vh_ygOTsiz67EvnJroqrus9hPWCjRV_qesY1ZXnQI1JT8yuV1wO0aJfAKxW1VtmOmwq7lQyw0gMpxBImoVZgrUSaCYU8Iwln_0YqBVuI0FmtztkBKZ2LMCiz8yThXrConQdt1mKsRL00hn_6_a1erpjwvcUOWWF5hwhbYsGemHfGmdAh_Cx1K3K_M9iPVvkb3rvWaGmid9YxM3OFoint9Kg4fyVGTuQu7O4FpRM5HbvxZ65LG_zb69H_GbCWtr_McCVkzD95-4H5wZuvgtly1QWRy7xDV-1tXanaoqbEYuf1SKCnWbEYJW3WbTORqhnLaFQ";

export const getProduct = async (id: number | string) => {
	const res: Response = await fetch(`${API_URL}/${id}`, {
		headers: {
			Authorization: ApiAuthToken,
		},
	});
	if (res.ok) {
		return await res.json();
	} else {
		throw new Error("Error on getProduct");
	}
};

export const getProducts = async (queryParams?: URLSearchParams): Promise<HydraCollectionInterface> => {
	const res: Response = await fetch(`${API_URL}${queryParams ? `?${queryParams}` : ""}`, {
		headers: {
			Authorization: ApiAuthToken,
		},
	});
	if (res.ok) {
		return await res.json();
	} else {
		throw new Error("Error on getProducts");
	}
};

export const newProduct = async (body: {}) => {
	const values = JSON.stringify(body);
	const res: Response = await fetch(`${API_URL}`, {
		method: "POST",
		body: values,
		headers: {
			"Content-Type": "application/json",
			Authorization: ApiAuthToken,
		},
	});
	if (!res.ok) {
		throw new Error("Error on newProduct");
	}
};

export const editProduct = async (body: {}, id: number | string) => {
	const values = JSON.stringify(body);
	const res: Response = await fetch(`${API_URL}${`/${id}`}`, {
		method: "PATCH",
		body: values,
		headers: {
			"Content-Type": "application/merge-patch+json",
			Authorization: ApiAuthToken,
		},
	});
	if (!res.ok) {
		throw new Error("Error on edit product");
	}
};
