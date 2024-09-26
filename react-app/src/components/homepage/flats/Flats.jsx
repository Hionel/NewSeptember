import { useState, useMemo, useCallback } from "react";
// import { useAuth } from "../../../contexts/AuthContext";

import { FIREBASE_ROLES } from "../../../maps/firebaseCollections";
import {
	saveFlatDocument,
	deleteFlatDocument,
	toggleFavoriteFlat,
	getApartments,
} from "../../../services/firebase/firestore/firestore-flats-service";

import AddEditFlatModal from "./AddEditFlatModal";
import AppBar from "@mui/material/AppBar";
import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import DataTable from "../../shared/DataTable";

import {
	homepageNavItems,
	NAV_MAP,
	FILTER_TABEL_MAP,
} from "../../../maps/navigationMaps";
import { getFlatsTableHeaders } from "../../../maps/tableMaps";
import { useOutletContext } from "react-router-dom";

const Flats = () => {
	const { currentUser } = useOutletContext();
	const [openModal, setOpenModal] = useState(false);
	const [editData, setEditData] = useState(null);
	const [tableFilter, setTableFilter] = useState(FILTER_TABEL_MAP.ALLFLATS);
	const [loading, setLoading] = useState(false);
	const isAdmin = currentUser.role === FIREBASE_ROLES.ADMIN;

	const handleOpenModal = () => {
		setOpenModal(true);
	};
	const handleCloseModal = () => {
		setEditData(null);
		setOpenModal(false);
	};

	const handleTableData = useCallback(async (filter) => {
		try {
			setTableFilter(filter);
		} catch (error) {
			console.error("Error updating table data: ", error);
		}
	}, []);

	const handleDelete = useCallback(
		async (id) => {
			setLoading(true);
			try {
				await deleteFlatDocument(id);
				handleTableData(tableFilter); // Refresh the table data
			} catch (error) {
				console.error("Error deleting document: ", error);
			} finally {
				setLoading(false);
			}
		},
		[handleTableData, tableFilter]
	);

	const handleFavorite = useCallback(
		async (id) => {
			setLoading(true);
			try {
				await toggleFavoriteFlat(id, currentUser.uid);
				handleTableData(tableFilter); // Refresh the table data
			} catch (error) {
				console.error("Error favoriting document: ", error);
			} finally {
				setLoading(false);
			}
		},
		[handleTableData, tableFilter, currentUser.uid]
	);

	const openEditModal = (flatData) => {
		setEditData(flatData);
		handleOpenModal();
	};

	const handleAddEditSave = useCallback(
		async (formData, docId = null, editMode = false) => {
			setLoading(true);
			try {
				await saveFlatDocument(formData, currentUser, editMode, docId);
				handleTableData(tableFilter); // This will ensure the table filter updates
			} catch (error) {
				console.error("Error saving data: ", error);
			} finally {
				setLoading(false);
			}
		},
		[currentUser, handleTableData, tableFilter]
	);

	const flatsTableColumns = useMemo(
		() =>
			getFlatsTableHeaders(
				handleDelete,
				handleFavorite,
				openEditModal,
				currentUser.uid,
				isAdmin
			),
		[currentUser.uid, isAdmin]
	);

	return (
		<Container
			disableGutters
			maxWidth="none"
			sx={{ height: "100%", margin: "0", display: "flex" }}
		>
			<AppBar
				position="static"
				sx={{ width: "15%", padding: "0rem 0.5rem", height: "100%" }}
			>
				<List
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "0.5rem",
						justifyContent: "flex-start",
					}}
				>
					{homepageNavItems.map((navItem) => (
						<Button
							key={navItem.id}
							onClick={
								navItem.id === NAV_MAP.ADD
									? handleOpenModal
									: () => handleTableData(navItem.filter)
							}
							variant="contained"
							startIcon={navItem.Icon()}
							color="info"
							size="small"
						>
							{navItem.label}
						</Button>
					))}
				</List>
				{openModal && (
					<AddEditFlatModal
						open={openModal}
						onClose={handleCloseModal}
						onSave={handleAddEditSave}
						formData={editData}
					/>
				)}
			</AppBar>
			<Container
				maxWidth="none"
				sx={{ width: "85%", m: "0rem", p: "0.5rem 0rem" }}
			>
				<Typography variant="h3" component="h3">
					{
						homepageNavItems.find((navItem) => navItem.filter === tableFilter)
							.label
					}
				</Typography>
				<DataTable
					columns={flatsTableColumns}
					loading={loading}
					setLoading={setLoading}
					getData={getApartments}
					fetcherProps={{
						uid: currentUser.uid,
						filter: tableFilter,
					}}
				/>
			</Container>
		</Container>
	);
};

export default Flats;
