import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

import { RouterProvider } from "react-router-dom";

import Routes from "./routes/Routes.jsx";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			light: "#757ce8",
			main: "#eeeeee",
			dark: "#002884",
			contrastText: "#fff",
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
			<ToastContainer></ToastContainer>
			<RouterProvider router={Routes}>
				<App />
			</RouterProvider>
		</ThemeProvider>
	</React.StrictMode>
);
