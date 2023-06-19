import Header from "./layouts/Header";
import Aside from "./layouts/Aside";
import { CustomTheme } from "./components/CustomTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { useState } from "react";
import Index from "./pages/order/Index";

const drawerWidth: Number = 250;

function App() {
	const [title, setTitle] = useState("Village Green");

	return (
		<ThemeProvider theme={CustomTheme}>
			<CssBaseline />
			<Box sx={{ display: "flex" }}>
				<Header width={drawerWidth} title={title} />
				<Aside width={drawerWidth}></Aside>
				<Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
					<Toolbar />
					<Index setTitle={setTitle}></Index>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default App;
