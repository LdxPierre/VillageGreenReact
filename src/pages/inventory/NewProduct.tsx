import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFetchData } from "../../hooks";

const schema = yup.object({
	name: yup
		.string()
		.min(5, "Le nom du produit doit comporter au moins 5 caractères")
		.max(50, "Le nom du produit ne doit pas dépasser 50 caractères")
		.required("Veuillez saisir un nom de produit"),
	brand: yup
		.string()
		.min(5, "La marque du produit doit comporter au moins 5 caractères")
		.max(50, "La marque du produit ne doit pas dépasser 50 caractères")
		.required("Veuillez saisir une marque"),
	category: yup.string().required("Veuillez choisir une catégorie"),
	price: yup.number().typeError("Veuillez saisir un nombre").required("Veuillez saisir un prix"),
	stock: yup.number().typeError("Veuillez saisir un nombre").required("Veuillez saisir un stock"),
});

export const NewProduct = (): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			brand: "",
			category: "",
			price: undefined,
			stock: undefined,
		},
		resolver: yupResolver(schema),
	});
	const { data: categories } = useFetchData({
		pathname: "categories",
		params: "content=products",
	});

	const onSubmit = async (values: {}): Promise<void> => {
		try {
			const res: Response = await fetch("http://localhost:8000/api/products", {
				method: "POST",
				body: JSON.stringify({ ...values }),
				headers: {
					"content-type": "application/json",
					accept: "application/json",
				},
			});
			const body = await res.json();
		} catch (e) {
			console.error(e);
		} finally {
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={1} sx={{ maxWidth: 1000, marginX: "auto" }}>
				<Grid item xs={12} md={6}>
					<TextField
						{...register("name")}
						error={errors.name ? true : false}
						helperText={errors.name?.message}
						id="name"
						label="Nom"
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						{...register("brand")}
						error={errors.brand ? true : false}
						helperText={errors.brand?.message}
						id="brand"
						label="Marque"
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl error={errors.category ? true : false} fullWidth>
						<InputLabel id="categoryLabel">Catégorie</InputLabel>
						<Select {...register("category")} labelId="categoryLabel" id="category" label="category" defaultValue={""}>
							{categories?.["hydra:member"].map((c) => (
								<MenuItem key={c.id} value={c.id}>
									{c.name}
								</MenuItem>
							))}
						</Select>
						<FormHelperText>{errors.category?.message}</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						{...register("price")}
						error={errors.price ? true : false}
						helperText={errors.price?.message}
						id="price"
						label="Prix"
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						{...register("stock")}
						error={errors.stock ? true : false}
						helperText={errors.stock?.message}
						id="stock"
						name="stock"
						label="Stock"
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
					<Button variant="contained" type="submit">
						Envoyer
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
