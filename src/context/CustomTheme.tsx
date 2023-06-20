import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

export const CustomTheme: Theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#009688",
		},
		secondary: {
			main: "#1de9b6",
		},
		background: {
			default: "#3b3b3b",
		},
	},
});
