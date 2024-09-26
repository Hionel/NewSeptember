import LockIcon from "@mui/icons-material/Lock";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import AddHomeIcon from "@mui/icons-material/AddHome";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

export const NAV_MAP = {
	HOME: "home",
	ALLUSERS: "allUsers",
	INBOX: "inbox",
	LOGOUT: "logout",
	PROFILE: "profile",
	ADD: "addFlat",
	ALLFLATS: "allFlats",
	FAVORITES: "favorites",
	MYFLATS: "myFlats",
};

export const navItems = [
	{
		id: NAV_MAP.HOME,
		label: "Home",
		path: "flats",
		Icon: () => <BusinessIcon />,
	},
	{
		id: NAV_MAP.ALLUSERS,
		label: "All Users",
		path: "users",
		Icon: () => <GroupIcon />,
	},
	{
		id: NAV_MAP.INBOX,
		label: "Inbox",
		path: "inbox",
		Icon: () => <AllInboxIcon />,
	},
];

export const FILTER_TABEL_MAP = {
	ALLFLATS: "all-Flats",
	FAVORITES: "favorites",
	MYFLATS: "my-Flats",
};

export const subProfileNavItems = [
	{
		id: NAV_MAP.PROFILE,
		label: "Profile",
		path: "profile",
		Icon: () => <AccountCircleIcon />,
	},
	{
		id: NAV_MAP.LOGOUT,
		label: "Logout",
		path: "/authentication",
		Icon: () => <LockIcon />,
	},
];

export const homepageNavItems = [
	{
		id: NAV_MAP.ADD,
		label: "Add",
		// path: "/homepage",
		Icon: () => <AddHomeIcon />,
	},
	{
		id: NAV_MAP.ALLFLATS,
		label: "All Flats",
		filter: FILTER_TABEL_MAP.ALLFLATS,
		Icon: () => <ApartmentIcon />,
	},
	{
		id: NAV_MAP.FAVORITES,
		label: "Favorites",
		filter: FILTER_TABEL_MAP.FAVORITES,
		Icon: () => <FavoriteIcon />,
	},
	{
		id: NAV_MAP.MYFLATS,
		label: "My Flats",
		filter: FILTER_TABEL_MAP.MYFLATS,
		Icon: () => <FolderCopyIcon />,
	},
];
