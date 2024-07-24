import { doc, setDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebase-service";
import { FIREBASE_COLLECTIONS } from "../../../maps/firebaseCollections";
import { signIn } from "../auth/authentication-service";

const USERS_COLLECTION_REF = FIREBASE_COLLECTIONS.USERS;
const DEFAULT_ROLE = "user";

export const createUserDocument = async (userData, userUID) => {
	try {
		const data = {
			email: userData.email,
			firstName: userData.firstName,
			lastName: userData.lastName,
			age: userData.age,
			creationDate: new Date(),
			role: DEFAULT_ROLE,
		};
		const docRef = doc(firebaseFirestore, USERS_COLLECTION_REF, userUID);
		await setDoc(docRef, data);

		if (!docRef)
			throw new Error("Something went wrong while creating the user document!");

		console.log("Document written with ID: ", docRef.id);
		await signIn(userData);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};
