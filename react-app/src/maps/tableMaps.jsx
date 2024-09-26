import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const getFlatsTableHeaders = (
	handleDelete,
	handleFavorite,
	handleEdit,
	currentUserUID,
	isAdmin
) => {
	const columns = [
		{
			field: "city",
			headerName: "City",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "flatName",
			headerName: "Flat name",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "streetName",
			headerName: "Street Name",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "streetNumber",
			type: "number",
			headerName: "Street Number",
			// width: 110,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "yearBuilt",
			headerName: "Year Built",
			type: "number",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "availableDate",
			headerName: "Available Date",
			// width: 110,
			type: "date",
			valueGetter: (value) => {
				return new Date(value);
			},
		},
		{
			field: "rentPrice",
			headerName: "Rent Price",
			type: "custom",
			valueGetter: (value) => {
				return `${value} €`;
			},
			headerAlign: "center",
			align: "center",
		},
		{
			field: "hasAC",
			headerName: "Has AC?",
			type: "boolean",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "actions",
			headerName: "Actions",
			sortable: false,
			width: "180",
			headerAlign: "center",
			align: "center",
			renderCell: (params) => (
				<>
					<IconButton
						color="primary"
						onClick={() => handleFavorite(params.row.id)}
					>
						<FavoriteIcon />
					</IconButton>
					{(params.row.userUID === currentUserUID || isAdmin) && (
						<IconButton
							color="error"
							onClick={() => handleDelete(params.row.id)}
						>
							<DeleteIcon />
						</IconButton>
					)}
					{(params.row.userUID === currentUserUID || isAdmin) && (
						<IconButton color="primary" onClick={() => handleEdit(params.row)}>
							<EditIcon />
						</IconButton>
					)}
				</>
			),
		},
	];
	return columns;
};

export const getAllUsersTableHeaders = (handleDelete, handleEdit) => {
	const columns = [
		{
			field: "email",
			headerName: "Email",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "role",
			headerName: "Role",
			type: "boolean",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "actions",
			headerName: "Actions",
			sortable: false,
			width: "180",
			headerAlign: "center",
			align: "center",
			renderCell: (params) => (
				<>
					<IconButton color="error" onClick={() => handleDelete(params.row.id)}>
						<DeleteIcon />
					</IconButton>
					<IconButton color="primary" onClick={() => handleEdit(params.row)}>
						<EditIcon />
					</IconButton>
				</>
			),
		},
	];
	return columns;
};
