import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetchData } from "../../../hooks";
import { ProductInterface } from "../../../types";
import { Save } from "@mui/icons-material";

interface FormData {
	name: string;
	brand: string;
	category: string;
	price?: number;
	stock?: number;
}

interface Props {
	method: string;
	product?: ProductInterface;
}

const nameIsValid = async (value: string) => {
	const res = fetch(`http://localhost:8000/api/products?name=${value}`, {
		headers: {
			accept: "application/json",
		},
	});
	const body = await (await res).json();
	if (body.length === 0) {
		return true;
	} else {
		return false;
	}
};

const createProductUrl = (name: string, brand: string) => {
	const url: string = `${brand} ${name}`.toLowerCase().replaceAll(" ", "-");
	return url;
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

export const FormProduct = ({ method, product }: Props): JSX.Element => {
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
	const { data: categories } = useFetchData({
		pathname: "categories",
		params: "content=products",
	});

	const onSubmit = async (values: FormData): Promise<void> => {
		const url: string = createProductUrl(values.name, values.brand);
		const newValues = { ...values, price: String(values.price), url };
		const id = method === "PATCH" && product ? product.id : "";
		console.log();
		try {
			const res: Response = await fetch(`http://localhost:8000/api/products${id}`, {
				method,
				body: JSON.stringify(newValues),
				headers: {
					"content-type": "application/json",
					accept: "application/json",
				},
			});
			const body = await res.json();
			console.log(body);
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
						{method === "PATCH" && product ? "Modifer" : "Enregistrer"}
					</LoadingButton>
				</Grid>
			</Grid>
		</form>
	);
};
