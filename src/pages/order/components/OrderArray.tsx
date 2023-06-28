import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { OrderInterface } from "../../../types";

interface Props {
	orderData: OrderInterface[];
}

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
];

const OrderArray = ({ orderData }: Props): JSX.Element => {
	return (
		<div>
			<DataGrid rows={orderData} columns={columns}></DataGrid>
		</div>
	);
};

export default OrderArray;
