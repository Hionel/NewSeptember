import { firebaseFirestore } from "../firebase-service";

import { FIREBASE_COLLECTIONS } from "../../../maps/firebaseCollections";
import { collection, doc, setDoc } from "firebase/firestore";

const FLATS_COLLECTION_REF = FIREBASE_COLLECTIONS.FLATS;

export const createFlatDocument = async (apartmentData, currentUser) => {
	const userUID = currentUser.uid;
	console.log(apartmentData, userUID);
	try {
		const data = {
			flatName: apartmentData.flatName,
			city: apartmentData.city,
			streetName: apartmentData.streetName,
			streetNumber: apartmentData.streetNumber,
			yearBuilt: apartmentData.yearBuilt,
			rentPrice: apartmentData.rentPrice,
			availableDate: apartmentData.availableDate,
			hasAC: apartmentData.hasAC,
			userUID: userUID,
			documentCreationDate: new Date(),
		};

		const docRef = doc(collection(firebaseFirestore, FLATS_COLLECTION_REF));
		await setDoc(docRef, data);

		if (!docRef)
			throw new Error("Something went wrong while creating the user document!");

		console.log("Document written with ID: ", docRef.id);
		// await signIn(userData);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};
