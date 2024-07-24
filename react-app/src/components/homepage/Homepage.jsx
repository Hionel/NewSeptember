// import { useContext } from "react";
import Header from "./Header";
import { useAuth } from "../../contexts/AuthContext";
import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../../services/firebase/auth/authentication-service";

const Homepage = () => {
	const { currentUser } = useAuth();

	return (
		<>
			{!currentUser ? (
				<Navigate to={"/authentication"}></Navigate>
			) : (
				<div>
					<Header currentUser={currentUser}></Header>
					{currentUser ? <Outlet /> : <></>}
				</div>
			)}
		</>
	);
};

export default Homepage;
