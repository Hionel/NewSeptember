import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";

const AuthNavigation = (props) => {
	const { links } = props || [];
	return (
		<nav className="auth_navigation displayFlex">
			{links.map((link, index) => (
				<Button
					key={index}
					component={RouterLink}
					to={link.path}
					color="primary"
					variant="text"
					sx={{ fontSize: "0.5rem", textAlign: "center" }}
					size="small"
				>
					{link.text}
				</Button>
			))}
		</nav>
	);
};

export default AuthNavigation;
