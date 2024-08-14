import { useModalForm } from "../../../customHooks/useModalForm";

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

import { getFlatInputMap } from "../../../maps/homepageMaps";
import { FIELD_NAMES } from "../../../utils/validations/flatModalValidation";

const MODAL_STYLE = {
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

const AddEditFlatModal = ({ open, onClose, formData, onSave }) => {
	const {
		flatData,
		editMode,
		errors,
		handleChange,
		handleError,
		setErrors,
		validateModalField,
	} = useModalForm(formData);

	const validateFormData = (formData) => {
		for (let field in formData) {
			if (field === FIELD_NAMES.HAS_AC) break;
			const validationResponse = validateModalField(field, formData[field]);
			setErrors((prevErrors) => ({
				...prevErrors,
				[field]: validationResponse,
			}));
		}
	};

	const handleErrorChecking = (errorsObject) => {
		return Object.values(errorsObject).some(
			(error) => error.success === false || error.success === null
		);
	};

	const handleSave = () => {
		const hasErrors = handleErrorChecking(errors);
		if (hasErrors) {
			validateFormData(flatData);
			return;
		}

		onSave(flatData, flatData.id, editMode);
		onClose();
	};

	const inputFields = getFlatInputMap(flatData);

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
				<Box sx={MODAL_STYLE}>
					<Typography id="transition-modal-title" variant="h6" component="h2">
						{editMode ? "Edit Flat" : "Add Flat"}
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
									variant="standard"
									label={field.label}
									name={field.name}
									type={field.type}
									value={flatData[field.name]}
									onChange={handleChange}
									onBlur={handleError}
									helperText={errors[field.name]?.message}
									error={errors[field.name]?.success === false}
									fullWidth
									size="small"
									sx={{
										height: "4rem",
									}}
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

export default AddEditFlatModal;
