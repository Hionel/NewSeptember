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
			checkboxSelection={false}
			disableRowSelectionOnClick
			autosizeOnMount={true}
			autoHeight={true}
			loading={loading}
			rowHeight={35}
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
				width: "100%",
			}}
		/>
	);
};

export default DataTable;
