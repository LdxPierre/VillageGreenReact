import { DataGrid, GridColDef } from "@mui/x-data-grid";
import OrderData from "./Order.data";

const columns: GridColDef[] = [
	{
		field: "id",
		headerName: "ID",
		width: 100,
		sortable: false,
		filterable: false,
	},
	{
		field: "status",
		headerName: "Status",
		width: 100,
		filterable: false,
		sortable: false,
	},
	{
		field: "customer",
		headerName: "Client",
		width: 130,
		filterable: false,
		sortable: false,
	},
	{
		field: "date",
		headerName: "Date de commande",
		width: 150,
		filterable: false,
		sortable: false,
	},
	{
		field: "product",
		headerName: "Produits",
		width: 200,
		filterable: false,
		sortable: false,
	},
];
("");

interface Props {
	orderData: OrderData[];
}

const OrderArray = ({ orderData }: Props): JSX.Element => {
	return (
		<div>
			<DataGrid rows={orderData} columns={columns}></DataGrid>
		</div>
	);
};

export default OrderArray;
