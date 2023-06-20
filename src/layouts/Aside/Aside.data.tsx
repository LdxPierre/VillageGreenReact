import { Home, Inventory, Person, ShoppingBag } from "@mui/icons-material";

type Links = {
	name: string;
	path: string;
	node: JSX.Element;
};

const links: Links[] = [
	{ name: "Home", path: "", node: <Home color="primary"></Home> },
	{
		name: "Catalogue",
		path: "",
		node: <Inventory color="primary"></Inventory>,
	},
	{ name: "Clients", path: "", node: <Person color="primary"></Person> },
	{
		name: "Commandes",
		path: "",
		node: <ShoppingBag color="primary"></ShoppingBag>,
	},
];

export { links };
