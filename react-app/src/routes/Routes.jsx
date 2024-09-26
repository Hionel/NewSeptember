import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "../App";
import Auth from "../components/authentication/auth/Auth";
import Login from "../components/authentication/login/Login";
import Register from "../components/authentication/register/Register";

import Homepage from "../components/homepage/Homepage";
import Flats from "../components/homepage/flats/Flats";
import Profile from "../components/homepage/profile/Profile";
import Inbox from "../components/homepage/inbox/Inbox";
import AllUsers from "../components/homepage/allUsers/AllUsers";
// import AllFlats from "../components/homepage/flats/AllFlats";
// import FavoritesFlats from "../components/homepage/flats/FavoritesFlats";
// import MyFlats from "../components/homepage/flats/MyFlats";

const routes = [
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Navigate replace to="/authentication" />,
			},
			{
				path: "authentication",
				element: <Auth />,
				children: [
					{
						index: true,
						element: <Login />,
					},
					{
						path: "register",
						element: <Register />,
					},
				],
			},
			{
				path: "homepage",
				element: <Homepage />,
				children: [
					{
						index: true,
						element: <Navigate replace to="flats" />,
					},
					{
						path: "flats",
						element: <Flats />,
						// children: [
						// 	{
						// 		path: "all-flats",
						// 		element: <AllFlats />,
						// 	},
						// 	{
						// 		path: "my-flats",
						// 		element: <MyFlats />,
						// 	},
						// 	{
						// 		path: "favorites",
						// 		element: <FavoritesFlats />,
						// 	},
						// ],
					},

					{
						path: "users",
						element: <AllUsers />,
					},
					{
						path: "inbox",
						element: <Inbox />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
				],
			},
		],
	},
];
const Routes = createBrowserRouter(routes);

export default Routes;
