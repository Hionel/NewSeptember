import { createContext, useContext, useEffect, useState } from "react";

import { firebaseAuth } from "../services/firebase/firebase-service";
import { firebaseFirestore } from "../services/firebase/firebase-service";
import { FIREBASE_COLLECTIONS } from "../maps/firebaseCollections";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
			let userDocData;
			if (user) {
				const docRef = doc(
					firebaseFirestore,
					FIREBASE_COLLECTIONS.USERS,
					user.uid
				);

				const docSnap = await getDoc(docRef);
				userDocData = docSnap.data();
				setCurrentUser({ ...user, role: userDocData.role });
			} else {
				setCurrentUser(user);
			}

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
