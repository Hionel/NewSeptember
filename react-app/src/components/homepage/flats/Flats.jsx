import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import AddEditFlatModal from "./AddEditFlatModal";

import { useAuth } from "../../../contexts/AuthContext";
import { createFlatDocument } from "../../../services/firebase/firestore/firestore-apartments-service";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import Toolbar from "@mui/material/Toolbar";

const Flats = () => {
	const { currentUser } = useAuth();
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	const handleAddEditSave = async (formData) => {
		setLoading(true);
		console.log(formData);
		try {
			await createFlatDocument(formData, currentUser);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AppBar
			position="static"
			sx={{ width: "fit-content", padding: "0rem 0.5rem", height: "100%" }}
		>
			<List>
				<Button
					onClick={handleOpen}
					variant="contained"
					startIcon={<AddIcon />}
					color="info"
				>
					Add
				</Button>
			</List>
			{!loading && (
				<AddEditFlatModal
					open={openModal}
					onClose={handleClose}
					onSave={handleAddEditSave}
				/>
			)}
		</AppBar>
	);
};

export default Flats;
