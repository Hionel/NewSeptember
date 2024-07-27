import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toasterType = {
	error: "error",
	success: "success",
	info: "info",
	warning: "warning",
};

const showToaster = (type, message, duration = 5000) => {
	toast[type](`${message}`, {
		position: "bottom-right",
		autoClose: duration,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Bounce,
	});
};

export default showToaster;
