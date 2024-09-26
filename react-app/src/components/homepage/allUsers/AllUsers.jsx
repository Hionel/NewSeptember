import { useState, useMemo } from "react";
// import { useAuth } from "../../../contexts/AuthContext";

import { Navigate, useOutletContext } from "react-router-dom";

import { getAllUsersTableHeaders } from "../../../maps/tableMaps";

import { getAllUsers } from "../../../services/firebase/firestore/firestore-user-service";

import DataTable from "../../shared/DataTable";
import { Container, Typography } from "@mui/material";

const PAGE_TITLE = "All Users";

const AllUsers = () => {
	const [loading, setLoading] = useState(false);
	const { currentUser } = useOutletContext();

	const handleDelete = () => {
		console.log("Delete");
	};
	const handleEdit = () => {
		console.log("Edit");
	};

	const usersTableColumns = useMemo(
		() => getAllUsersTableHeaders(handleDelete, handleEdit),
		[]
	);

	return currentUser.role !== "admin" ? (
		<Navigate to={"/homepage"} />
	) : (
		<Container
			maxWidth="none"
			sx={{ width: "85%", m: "0rem", p: "0.5rem 0rem" }}
		>
			<Typography variant="h3" component="h3">
				{PAGE_TITLE}
			</Typography>
			<DataTable
				columns={usersTableColumns}
				loading={loading}
				setLoading={setLoading}
				getData={getAllUsers}
			/>
		</Container>
	);
};

export default AllUsers;
