import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { CustomTheme } from "./context/CustomTheme";
import Header from "./layouts/Header/Header";
import Aside from "./layouts/Aside/Aside";
import Index from "./pages/inventory/Index";
const drawerWidth: Number = 250;

function App() {
	const [title, setTitle] = useState("Village Green");

	useEffect(() => {
		setTitle("Catalogue");
	}, []);

	return (
		<ThemeProvider theme={CustomTheme}>
			<CssBaseline />
			<Box sx={{ display: "flex" }}>
				<Header width={drawerWidth} title={title} />
				<Aside width={drawerWidth}></Aside>
				<Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
					<Toolbar />
					<Index></Index>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default App;
