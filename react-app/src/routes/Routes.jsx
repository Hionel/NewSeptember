import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "../App";
import Auth from "../components/authentication/auth/Auth";
import Login from "../components/authentication/login/Login";
import Register from "../components/authentication/register/Register";

import Homepage from "../components/homepage/Homepage";

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
					// {
					// 	path: "reset-password",
					// 	element: <ResetPassword />,
					// },
				],
			},
			{
				path: "homepage",
				element: <Homepage />,
				// children: [
				// 	{
				// 		path: "create",
				// 		element: <CreateComponent />,
				// 	},
				// 	{
				// 		path: "list",
				// 		element: <ListComponent />,
				// 	},
				// ],
			},
		],
	},
];
const Routes = createBrowserRouter(routes);

export default Routes;
