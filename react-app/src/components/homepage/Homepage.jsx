import LockIcon from "@mui/icons-material/Lock";
import { IconButton } from "@mui/material";
import { signUserOut } from "../../services/firebase/auth/authentication-service";
import { useNavigate } from "react-router-dom";

function Homepage() {
	const navigate = useNavigate();

	const handleSignOut = () => {
		signUserOut();
		navigate("/authentication");
	};
	return (
		<div>
			Hoe page
			<IconButton
				variant="text"
				type="submit"
				color="primary"
				size="small"
				onClick={handleSignOut}
			>
				<LockIcon />
			</IconButton>
		</div>
	);
}

export default Homepage;
