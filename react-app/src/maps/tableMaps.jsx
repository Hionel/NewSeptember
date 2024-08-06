import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const getFlatsTableHeaders = (
	handleDelete,
	handleFavorite,
	currentUserUID,
	isAdmin
) => {
	const columns = [
		{ field: "city", headerName: "City", width: 130 },
		{ field: "flatName", headerName: "Flat name", width: 130 },
		{
			field: "streetName",
			headerName: "Street Name",
			width: 130,
		},
		{
			field: "streetNumber",
			type: "number",
			headerName: "Street Number",
			width: 130,
		},
		{
			field: "yearBuilt",
			headerName: "Year Built",
			type: "number",
			width: 130,
		},
		{
			field: "availableDate",
			headerName: "Available Date",
			type: "date",
			valueGetter: (params) => new Date(params.value),
			width: 130,
		},
		{
			field: "rentPrice",
			headerName: "Rent Price",
			type: "custom",
			width: 130,
		},
		{
			field: "hasAC",
			headerName: "Has AC?",
			type: "boolean",
			width: 130,
		},
		{
			field: "actions",
			headerName: "Actions",
			sortable: false,
			flex: 2,
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
				</>
			),
		},
	];
	return columns;
};
