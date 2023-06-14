import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AccountCircle, Home, Notifications } from "@mui/icons-material";
import React from "react";

const userMenu: Array<string> = ["Votre profile", "Se déconnecter"];
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Header(): JSX.Element {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box sx={{ flexGrow: 0 }}>
            <IconButton size="large" edge="start" color="primary" aria-label="home" sx={{ mr: 2 }}>
              <Home />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component={"h1"}>
              VillageGreen
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Notification">
              <IconButton>
                <Notifications></Notifications>
              </IconButton>
            </Tooltip>
            {/* Menu Notif Heres */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircle></AccountCircle>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "35px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenu.map((link) => (
                <MenuItem key={link} onClick={handleCloseUserMenu}>
                  <Typography textAlign={"center"}>{link}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
