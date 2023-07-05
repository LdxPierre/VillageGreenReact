import { createContext } from "react";
import { UserInterface } from "../types/UserInterface";

export const UserContext = createContext<UserInterface | null>(null);
