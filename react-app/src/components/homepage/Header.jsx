import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { signUserOut } from "../../services/firebase/auth/authentication-service";
import { useNavigate } from "react-router-dom";

const NAVMAP = {
	HOME: "home",
	ALLUSERS: "allUsers",
	INBOX: "inbox",
	LOGOUT: "logout",
	PROFILE: "profile",
};

function Header() {
	const logoTitle = "Hosehold";
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const subProfileNavItems = [
		{
			id: NAVMAP.PROFILE,
			label: "Profile",
			path: "profile",
			exposeIcon: () => (
				<IconButton variant="text" type="submit" color="primary" size="small">
					<AccountCircleIcon />
				</IconButton>
			),
		},
		{
			id: NAVMAP.LOGOUT,
			label: "Logout",
			path: "/authentication",
			exposeIcon: () => (
				<IconButton variant="text" type="submit" color="primary" size="small">
					<LockIcon />
				</IconButton>
			),
		},
	];

	const navItems = [
		{
			id: NAVMAP.HOME,
			label: "Home",
			path: "/homepage",
		},
		{
			id: NAVMAP.ALLUSERS,
			label: "All Users",
			path: "users/all",
		},
		{
			id: NAVMAP.INBOX,
			label: "Inbox",
			path: "inbox",
		},
	];

	const navigate = useNavigate();

	const handleNavigation = (navItem) => {
		if (navItem.id === NAVMAP.LOGOUT) {
			signUserOut();
		}
		navigate(`${navItem.path}`);
	};

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
		<AppBar position="static" variant="elevation">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<ApartmentIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						// onClick={() =>
						// 	navigate(navItems.find((item) => item.id == NAVMAP.HOME))
						// }
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/homepage"
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
							{navItems.map((page) => (
								<MenuItem
									key={page.id}
									onClick={() => {
										handleNavigation(page);
										handleCloseNavMenu();
									}}
								>
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
						href="#app-bar-with-responsive-menu"
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
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{navItems.map((page) => (
							<Button
								key={page.id}
								onClick={() => {
									handleNavigation(page);
									handleCloseNavMenu();
								}}
								sx={{ my: 2, color: "white", display: "block" }}
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
									{subNavOption.exposeIcon()}
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
}
export default Header;
