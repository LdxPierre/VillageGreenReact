import React from "react";
import { LinkProps as RouterLinksProps, NavLink as RouterNavLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const Link = React.forwardRef<HTMLAnchorElement, RouterLinksProps>(function NavLink(itemProps, ref) {
  return <RouterNavLink ref={ref} {...itemProps} role={undefined} />;
});

const ListItemLink = ({ icon, primary, to }: ListItemLinkProps): JSX.Element => {
  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

export default ListItemLink;
