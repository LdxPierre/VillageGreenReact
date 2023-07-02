import { Drawer, List, Toolbar } from "@mui/material";
import { Home, Inventory, Person, ShoppingBag } from "@mui/icons-material";
import ListItemLink from "./components/ListItemLink";

interface Props {
  width: Number;
}

type Links = {
  name: string;
  path: string;
  icon: JSX.Element;
};

const links: Links[] = [
  { name: "Home", path: "/", icon: <Home color="primary"></Home> },
  {
    name: "Catalogue",
    path: "/products",
    icon: <Inventory color="primary"></Inventory>,
  },
  { name: "Clients", path: "", icon: <Person color="primary"></Person> },
  {
    name: "Commandes",
    path: "/orders",
    icon: <ShoppingBag color="primary"></ShoppingBag>,
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
      <List>
        {links.map((link) => (
          <ListItemLink key={link.name} icon={link.icon} primary={link.name} to={link.path} />
        ))}
      </List>
    </Drawer>
  );
};

export default Aside;
