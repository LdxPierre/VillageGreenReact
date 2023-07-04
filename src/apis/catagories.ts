import { getCookie } from "../services/utils";

const API_URL = "http://localhost:8000/api/categories";

export const getCategories = async (params?: URLSearchParams) => {
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
