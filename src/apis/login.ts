const API_URL = "http://localhost:8000/api/login";
export const loginUser = async (values: { email: string; password: string }) => {
	const body = JSON.stringify(values);
	const res: Response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body,
	});
	const resBody = await res.json();
	const { status } = res;
	return { status, resBody };
};
