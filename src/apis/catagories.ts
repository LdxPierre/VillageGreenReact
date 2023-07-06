import { getCookie } from "../services/utils";
import { HydraCollectionInterface } from "../types";

const API_URL = "http://localhost:8000/api/categories";

export const getCategories = async (params?: URLSearchParams): Promise<HydraCollectionInterface> => {
	const res: Response = await fetch(`${API_URL}${params ? `?${params}` : ""}`, {
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
