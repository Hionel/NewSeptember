import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../services/firebase/firebase-service";

const AuthContext = createContext(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
			console.log("User inside the use effect in provider", user);
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
