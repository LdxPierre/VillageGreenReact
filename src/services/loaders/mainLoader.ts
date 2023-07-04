import { redirect } from "react-router-dom";
import { loginCheck } from "../../apis";

export const mainLoader = async () => {
  try {
    const res: Response = await loginCheck();
    if (res.status === 200) {
      return await res.json();
    } else if (res.status === 401) {
      return redirect("/login");
    } else {
      throw new Error("Error on login check");
    }
  } catch (e) {
    return e;
  }
};
