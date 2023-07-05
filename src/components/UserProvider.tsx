import { UserContext } from "../context";
import { useLoaderData } from "react-router-dom";
import { UserInterface } from "../types/UserInterface";

interface PropsInterface {
	children: JSX.Element;
}

export const UserProvider = ({ children }: PropsInterface): JSX.Element => {
	const user: UserInterface | null = useLoaderData() as UserInterface | null;
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
