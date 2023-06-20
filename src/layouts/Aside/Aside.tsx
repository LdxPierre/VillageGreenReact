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
import { links } from "./Aside.data";

interface Props {
	width: Number;
}

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
							<ListItemIcon>{link.node}</ListItemIcon>
							<ListItemText primary={link.name}></ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default Aside;
