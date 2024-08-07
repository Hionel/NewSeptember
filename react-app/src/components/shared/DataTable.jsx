import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = (props) => {
	const [rows, setRows] = useState([]);
	const { columns, filter, uid, loading, getData } = props;

	useEffect(() => {
		const fetchData = async () => {
			if (!getData) return;

			const unsubscribe = await getData(filter, uid, setRows);

			return () => {
				if (unsubscribe) {
					unsubscribe();
				}
			};
		};
		fetchData();
	}, [filter, uid, getData]);

	return (
		<DataGrid
			rows={rows}
			columns={columns}
			initialState={{
				pagination: {
					paginationModel: { page: 0, pageSize: 50 },
				},
			}}
			pageSizeOptions={[10, 25, 50, 100]}
			disableRowSelectionOnClick
			autoHeight={true}
			loading={loading}
			slotProps={{
				loadingOverlay: {
					variant: "linear-progress",
					noRowsVariant: "skeleton",
				},
				toolbar: {
					showQuickFilter: true,
				},
			}}
			sx={{
				width: "fit-content",
			}}
		/>
	);
};

export default DataTable;
