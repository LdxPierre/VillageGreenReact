import { Link as RouterLink } from "react-router-dom";
import { Box, AppBar, Toolbar, IconButton, Typography, Tooltip, Menu, MenuItem, Avatar, Link } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import React from "react";

interface PropsInterface {
	title: String;
}

function Header({ title }: PropsInterface): JSX.Element {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<Box sx={{ flexGrow: 1 }}>
					<Typography variant="h6" component={"h1"}>
						{title}
					</Typography>
				</Box>
				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title="Notification">
						<IconButton sx={{ mr: 2 }}>
							<Notifications color="warning" />
						</IconButton>
					</Tooltip>
					{/* Menu Notif Heres */}
					<Tooltip title="Utilisateur">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar color="primary" />
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: "45px" }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{ vertical: "top", horizontal: "right" }}
						keepMounted
						transformOrigin={{ vertical: "top", horizontal: "right" }}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}>
						<MenuItem onClick={handleCloseUserMenu}>
							<Link component={RouterLink} to={"/logout"} underline="none">
								Déconnexion
							</Link>
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
