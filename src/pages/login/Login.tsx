import { ThemeProvider } from "@emotion/react";
import { useActionData, useSubmit } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, CssBaseline, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CustomTheme } from "../../context";

const schema = yup.object({
	email: yup.string().email("Email non valide").required("Veuillez saisir votre adresse email"),
	password: yup.string().required("Veuillez saisir votre mot de passe"),
});

const Login = (): JSX.Element => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(schema) });
	const submit = useSubmit();
	const globalError = useActionData();

	const onSubmit = (data: {}) => {
		submit(data, { method: "POST" });
	};

	return (
		<ThemeProvider theme={CustomTheme}>
			<CssBaseline />
			<Box
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				sx={{ height: "100vh" }}>
				<Paper elevation={3} sx={{ p: 2 }}>
					<Box
						display={"flex"}
						flexDirection={"column"}
						component={"form"}
						noValidate
						autoComplete="off"
						sx={{ width: 300 }}
						onSubmit={handleSubmit((data) => onSubmit(data))}>
						<TextField
							id="email"
							label="Adresse e-mail"
							type="text"
							{...register("email")}
							error={errors.email ? true : false}
							helperText={errors.email?.message}
						/>
						<TextField
							id="password"
							label="Mot de passe"
							type="password"
							sx={{ mt: 1 }}
							{...register("password")}
							error={errors.password ? true : false}
							helperText={errors.password?.message}
						/>
						<LoadingButton
							variant="contained"
							sx={{ mt: 1 }}
							type="submit"
							loading={isSubmitting}
							loadingIndicator="Connexion ...">
							Connexion
						</LoadingButton>
						{globalError ? (
							<Typography color={"error"} align="center" sx={{ mt: 2 }}>
								{String(globalError)}
							</Typography>
						) : null}
					</Box>
				</Paper>
			</Box>
		</ThemeProvider>
	);
};

export default Login;
