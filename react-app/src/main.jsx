import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";

import Routes from "./routes/Routes.jsx";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			light: "#757ce8",
			main: "rgba(0, 0, 0, 0.5);",
			dark: "#002884",
			contrastText: "#ffff",
		},
		secondary: {
			light: "#ff7961",
			main: "#f44336",
			dark: "#ba000d",
			contrastText: "#000",
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<ToastContainer></ToastContainer>
				<RouterProvider router={Routes}></RouterProvider>
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>
);
