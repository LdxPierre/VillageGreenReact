import { Box, CircularProgress } from "@mui/material";

export const Loading = (): JSX.Element => {
	return (
		<Box display={"flex"} alignContent={"center"} justifyContent={"center"} sx={{ minHeight: 500 }} flexWrap={"wrap"}>
			<CircularProgress />
		</Box>
	);
};
