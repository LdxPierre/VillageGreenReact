import { redirect } from "react-router-dom";
import { loginUser } from "../../apis";
import { setCookie } from "../utils";

export const loginAction = async ({ request }: { request: Request }) => {
	const values = Object.fromEntries(await request.formData());
	try {
		const res: { status: number; resBody: { status?: number; message?: string; token?: string } } = await loginUser({
			email: String(values.email),
			password: String(values.password),
		});
		if (res.status === 200 && res.resBody.token) {
			setCookie("token", res.resBody.token, 1);
			return redirect("/");
		} else {
			return res.resBody.message;
		}
	} catch (e) {
		console.error(e);
	}
	return null;
};
