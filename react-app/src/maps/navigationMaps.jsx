import LockIcon from "@mui/icons-material/Lock";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import AllInboxIcon from "@mui/icons-material/AllInbox";

export const NAVMAP = {
	HOME: "home",
	ALLUSERS: "allUsers",
	INBOX: "inbox",
	LOGOUT: "logout",
	PROFILE: "profile",
};

export const navItems = [
	{
		id: NAVMAP.HOME,
		label: "Home",
		path: "/homepage",
		Icon: () => <BusinessIcon />,
	},
	{
		id: NAVMAP.ALLUSERS,
		label: "All Users",
		path: "users/all",
		Icon: () => <GroupIcon />,
	},
	{
		id: NAVMAP.INBOX,
		label: "Inbox",
		path: "inbox",
		Icon: () => <AllInboxIcon />,
	},
];

export const subProfileNavItems = [
	{
		id: NAVMAP.PROFILE,
		label: "Profile",
		path: "profile",
		Icon: () => <AccountCircleIcon />,
	},
	{
		id: NAVMAP.LOGOUT,
		label: "Logout",
		path: "/authentication",
		Icon: () => <LockIcon />,
	},
];
