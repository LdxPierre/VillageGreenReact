import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductInterface } from "../../types";
import { Save } from "@mui/icons-material";
import { getProducts } from "../../apis";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { useSubmit } from "react-router-dom";

interface Props {
	submitValue?: string;
	product?: ProductInterface;
}

const nameIsValid = async (name: string) => {
	const queryParams = new URLSearchParams();
	queryParams.append("name", name);
	const body = await getProducts(queryParams);
	if (body["hydra:member"].length === 0) {
		return true;
	} else {
		return false;
	}
};

const schema = yup.object({
	name: yup
		.string()
		.min(5, "Le nom du produit doit comporter au moins 5 caractères")
		.max(50, "Le nom du produit ne doit pas dépasser 50 caractères")
		.matches(/^[a-zA-Z\d\- éèçàâêûîôäëÿüïö]*$/, "Le nom ne doit pas contenir de caractères spécial")
		.required("Veuillez saisir un nom de produit")
		.test("unique name", "Un produit du même nom existe déjà", (value) => nameIsValid(value)),
	brand: yup
		.string()
		.min(5, "La marque du produit doit comporter au moins 5 caractères")
		.max(50, "La marque du produit ne doit pas dépasser 50 caractères")
		.required("Veuillez saisir une marque"),
	category: yup.string().required("Veuillez choisir une catégorie"),
	price: yup.number().typeError("Veuillez saisir un nombre").required("Veuillez saisir un prix"),
	stock: yup.number().typeError("Veuillez saisir un nombre").required("Veuillez saisir un stock"),
});

const ProductForm = ({ submitValue = "Envoyer", product }: Props): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: product?.name ?? "",
			brand: product?.brand ?? "",
			category: product ? String(product.category_id) : "",
			stock: product?.stock ?? undefined,
			price: product?.price ?? undefined,
		},
		resolver: yupResolver(schema),
		reValidateMode: "onBlur",
	});
	const { categories } = useFetchCategories(new URLSearchParams("content=products"));
	const submit = useSubmit();

	const onSubmit = async (data: {}): Promise<void> => {
		submit(data, { method: "post" });
	};

	return (
		<form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
								<MenuItem key={c.name} value={"api/categories/" + c.id}>
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
					<LoadingButton
						loading={isSubmitting}
						loadingPosition="start"
						startIcon={<Save />}
						variant="contained"
						type="submit">
						{submitValue}
					</LoadingButton>
				</Grid>
			</Grid>
		</form>
	);
};

export default ProductForm;
