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
	{ field: "name", headerName: "Name", width: 130, filterable: false },
];

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
