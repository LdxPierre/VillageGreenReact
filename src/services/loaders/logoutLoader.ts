import { redirect } from "react-router-dom";
import { setCookie } from "../utils";

export const logoutLoader = () => {
	setCookie("token", "", -1);
	return redirect("/login");
};
