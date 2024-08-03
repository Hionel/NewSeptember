import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { signUserOut } from "../../services/firebase/auth/authentication-service";

import { FIREBASE_ROLES } from "../../maps/firebaseCollections";
import {
	NAV_MAP,
	navItems,
	subProfileNavItems,
} from "../../maps/navigationMaps";

const Header = (props) => {
	const navigate = useNavigate();
	const { currentUser } = props;
	const { displayName, email, role } = currentUser;
	const username = displayName ? displayName : email;

	const logoTitle = "Hosehold";
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleNavigation = (navItem) => {
		if (navItem.id === NAV_MAP.LOGOUT) {
			signUserOut();
		}
		navigate(`${navItem.path}`);
	};

	const navigationItems = navItems.filter(
		(page) => role === FIREBASE_ROLES.ADMIN || page.id !== NAV_MAP.ALLUSERS
	);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" sx={{ height: "100%" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<ApartmentIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						onClick={() => handleNavigation(navItems[0])}
						// href="/homepage"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						{logoTitle}
					</Typography>
					<Typography
						variant="caption"
						noWrap
						component="a"
						onClick={() => handleNavigation(subProfileNavItems[0])}
						sx={{
							mr: 2,
							display: { xs: "ƒlex", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 400,
							color: "inherit",
							textDecoration: "none",
						}}
					>
						{`Welcome, ${username}`}
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{navigationItems.map((page) => (
								<MenuItem
									key={page.id}
									onClick={() => {
										handleNavigation(page);
										handleCloseNavMenu();
									}}
								>
									{page.Icon()}
									<Typography textAlign="center">{page.label}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<ApartmentIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/homepage"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						{logoTitle}
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "flex-end",
							mr: 2,
						}}
					>
						{navigationItems.map((page) => (
							<Button
								key={page.id}
								startIcon={page.Icon()}
								onClick={() => {
									handleNavigation(page);
									handleCloseNavMenu();
								}}
								sx={{ my: 2, color: "white", display: "flex" }}
							>
								{page.label}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Avatar" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{subProfileNavItems.map((subNavOption) => (
								<MenuItem
									key={subNavOption.id}
									onClick={() => {
										handleNavigation(subNavOption);
										handleCloseUserMenu();
									}}
								>
									{subNavOption.Icon()}
									<Typography textAlign="center">
										{subNavOption.label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
