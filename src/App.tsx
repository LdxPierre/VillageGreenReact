import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { CustomTheme } from "./context/CustomTheme";
import Header from "./layouts/Header/Header";
import Aside from "./layouts/Aside/Aside";
import { UserProvider } from "./components";
const drawerWidth: Number = 250;

function App() {
	const [title, setTitle] = useState("Village Green");

	return (
		<ThemeProvider theme={CustomTheme}>
			<CssBaseline />
			<UserProvider>
				<Box sx={{ display: "flex" }}>
					<Header title={title} />
					<Aside width={drawerWidth}></Aside>
					<Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
						<Toolbar />
						<Suspense>
							<Outlet />
						</Suspense>
					</Box>
				</Box>
			</UserProvider>
		</ThemeProvider>
	);
}

export default App;
