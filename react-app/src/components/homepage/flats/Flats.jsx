import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
// import CssBaseline from "@mui/material/CssBaseline";
// import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import AddEditFlat from "./AddEditFlat";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

const Flats = () => {
	const [openModal, setOpenModal] = useState(false);

	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

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
			<AddEditFlat open={openModal} onClose={handleClose} />
		</AppBar>
	);
};

export default Flats;
