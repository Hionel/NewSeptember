import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Header from "./Header";

import { doc, getDoc } from "firebase/firestore";
import { firebaseFirestore } from "../../services/firebase/firebase-service";
import { FIREBASE_COLLECTIONS } from "../../maps/firebaseCollections";
import { Container } from "@mui/material";

const Homepage = () => {
	const { currentUser, setCurrentUser } = useAuth();

	useEffect(() => {
		if (!currentUser) return;
		fetchLoggedUser(currentUser);
	}, []);

	const fetchLoggedUser = async (user) => {
		const docRef = doc(firebaseFirestore, FIREBASE_COLLECTIONS.USERS, user.uid);
		const docSnap = await getDoc(docRef);
		const userDocData = docSnap.data();
		setCurrentUser({ ...user, role: userDocData.role });
	};

	return (
		<>
			{!currentUser ? (
				<Navigate to={"/authentication"}></Navigate>
			) : (
				<Container
					maxWidth="none"
					disableGutters
					sx={{
						height: "100%",
						margin: "0",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Container
						disableGutters
						maxWidth="none"
						sx={{ height: "fit-content" }}
					>
						<Header currentUser={currentUser}></Header>
					</Container>

					<Container disableGutters maxWidth="none" sx={{ flexGrow: "1" }}>
						<Outlet />
					</Container>
				</Container>
			)}
		</>
	);
};

export default Homepage;
