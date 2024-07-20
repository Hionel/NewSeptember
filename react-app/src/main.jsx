import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

import { RouterProvider } from "react-router-dom";

import Routes from "./routes/Routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ToastContainer></ToastContainer>
		<RouterProvider router={Routes}>
			<App />
		</RouterProvider>
	</React.StrictMode>
);
