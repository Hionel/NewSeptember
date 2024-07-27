import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	borderRadius: "10px",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const inputFields = [
	{ name: "name", label: "Name", type: "text" },
	{ name: "city", label: "City", type: "text" },
	{ name: "streetName", label: "Street Name", type: "text" },
	{ name: "streetNumber", label: "Street Number", type: "number" },
	{ name: "yearBuilt", label: "Year Built", type: "number" },
	{ name: "rentPrice", label: "Rent Price", type: "number" },
	{ name: "availableDate", label: "Available Date", type: "date" },
	{ name: "hasAC", label: "Has AC ?", type: "checkbox" },
];

const AddEditFlat = (props) => {
	const { open, onClose, formData = null, onSave } = props;

	const [flatData, setFlatData] = useState(
		inputFields.reduce((acc, field) => {
			acc[field.name] = field.type === "checkbox" ? false : "";
			return acc;
		}, {})
	);

	const modalTitle = formData ? "Edit Flat" : "Add Flat";

	useEffect(() => {
		if (formData) {
			setFlatData((prevData) => ({
				...prevData,
				...formData,
			}));
		} else {
			setFlatData(
				inputFields.reduce((acc, field) => {
					acc[field.name] = field.type === "checkbox" ? false : "";
					return acc;
				}, {})
			);
		}
	}, [formData]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFlatData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSave = () => {
		onSave(flatData);
		onClose();
	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={onClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					<Typography id="transition-modal-title" variant="h6" component="h2">
						{modalTitle}
					</Typography>
					<Box
						component="form"
						sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
					>
						{inputFields.map((field) =>
							field.type === "checkbox" ? (
								<FormControlLabel
									key={field.name}
									label={field.label}
									labelPlacement="start"
									control={
										<Checkbox
											checked={flatData[field.name]}
											onChange={handleChange}
											name={field.name}
										/>
									}
									sx={{ flexDirection: "row", margin: "0" }}
								/>
							) : (
								<TextField
									key={field.name}
									label={field.label}
									name={field.name}
									value={flatData[field.name]}
									onChange={handleChange}
									variant="standard"
									fullWidth
									type={field.type}
									InputLabelProps={
										field.type === "date" ? { shrink: true } : undefined
									}
								/>
							)
						)}
						<Box
							sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}
						>
							<Button
								variant="contained"
								color="primary"
								startIcon={<SaveIcon />}
								onClick={handleSave}
							>
								Save
							</Button>
							<Button
								variant="outlined"
								color="error"
								startIcon={<CancelIcon />}
								onClick={onClose}
							>
								Cancel
							</Button>
						</Box>
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
};

export default AddEditFlat;
