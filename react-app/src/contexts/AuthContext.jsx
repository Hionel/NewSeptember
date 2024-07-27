import { createContext, useContext, useEffect, useState } from "react";

import { firebaseAuth } from "../services/firebase/firebase-service";

import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
			console.log("User inside the use effect in provider", user);
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);
	[];
	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
