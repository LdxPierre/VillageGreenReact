import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material";
import { Home, Inventory, Person, ShoppingBag } from "@mui/icons-material";

type Props = {
	width: Number;
};

const links: string[][] = [
	["Tableau de bord", "link", "Home"],
	["Catalogue", "link", "Inventory"],
	["Clients", "link", "Person"],
	["Commandes", "link", "ShoppingBag"],
];

const Aside = ({ width }: Props): JSX.Element => {
	return (
		<Drawer
			sx={{
				width: `${width}px`,
				flexShrink: 0,
				"& .MuiDrawer-paper": { width: `${width}px`, boxSizing: "border-box" },
			}}
			variant="permanent"
			anchor="left">
			<Toolbar />
			<Divider />
			<List>
				{links.map((link, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Home color="primary" />
							</ListItemIcon>
							<ListItemText primary={link[0]}></ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default Aside;
