import { useState, useEffect } from "react";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const DataTable = (props) => {
	const [rows, setRows] = useState([]);
	const {
		columns,
		loading,
		setLoading = null,
		getData,
		fetcherProps = null,
	} = props;

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			if (!getData) return;
			const unsubscribe = await getData(handleSetter, { ...fetcherProps });
			console.log(unsubscribe);
			return () => {
				if (unsubscribe) {
					unsubscribe();
				}
			};
		};
		fetchData();
		setLoading(false);
	}, [fetcherProps, getData]);

	const handleSetter = (fetcherData) => {
		setRows(fetcherData);
	};

	return (
		<DataGrid
			rows={rows}
			columns={columns}
			initialState={{
				pagination: {
					paginationModel: { page: 0, pageSize: 50 },
				},
			}}
			pageSizeOptions={PAGE_SIZE_OPTIONS}
			disableRowSelectionOnClick
			autoHeight={true}
			loading={loading}
			slots={{ toolbar: GridToolbar }}
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
				"&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
					outline: "none",
				},
				width: "max-content",
				".MuiDataGrid-menuIcon": {
					visibility: "visible !important",
					width: "auto !important",
				},
			}}
		/>
	);
};

export default DataTable;
