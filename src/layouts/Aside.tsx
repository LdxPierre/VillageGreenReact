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
			<Toolbar></Toolbar>
			<Divider></Divider>
			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<Home></Home>
						</ListItemIcon>
						<ListItemText primary="Accueil"></ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<Inventory></Inventory>
						</ListItemIcon>
						<ListItemText primary="Catalogue"></ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<Person></Person>
						</ListItemIcon>
						<ListItemText primary="Clients"></ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<ShoppingBag></ShoppingBag>
						</ListItemIcon>
						<ListItemText primary="Commandes"></ListItemText>
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default Aside;
