import Header from "./layouts/Header";
import Aside from "./layouts/Aside";
import { CustomTheme } from "./components/CustomTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, Toolbar } from "@mui/material";

const drawerWidth: Number = 250;

function App() {
	return (
		<ThemeProvider theme={CustomTheme}>
			<CssBaseline />
			<Box sx={{ display: "flex" }}>
				<Header width={drawerWidth} />
				<Aside width={drawerWidth}></Aside>
				<Box
					component={"main"}
					sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
					<Toolbar />
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default App;
