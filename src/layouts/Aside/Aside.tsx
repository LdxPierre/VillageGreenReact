import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Home, Inventory, Person, ShoppingBag } from "@mui/icons-material";

interface Props {
  width: Number;
}

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

const Aside = ({ width }: Props): JSX.Element => {
  return (
    <Drawer
      sx={{
        width: `${width}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: `${width}px`, boxSizing: "border-box" },
      }}
      variant="permanent"
      anchor="left"
    >
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
