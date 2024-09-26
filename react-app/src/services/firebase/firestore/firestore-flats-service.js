import { firebaseFirestore } from "../firebase-service";

import showToaster from "../../toaster-service";
import { FIREBASE_COLLECTIONS } from "../../../maps/firebaseCollections";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	query,
	where,
	onSnapshot,
	arrayRemove,
	documentId,
	writeBatch,
} from "firebase/firestore";
import { FILTER_TABEL_MAP } from "../../../maps/navigationMaps";

const FLATS_COLLECTION_NAME = FIREBASE_COLLECTIONS.FLATS;
const USERS_COLLECTION_NAME = FIREBASE_COLLECTIONS.USERS;
const MAX_BATCH_SIZE = 10;

export const saveFlatDocument = async (
	apartmentData,
	currentUser,
	isEdit = false,
	docId = null
) => {
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

		if (isEdit && docId) {
			const docRef = doc(firebaseFirestore, FLATS_COLLECTION_NAME, docId);
			await updateDoc(docRef, data);
			console.log("Document updated with ID: ", docRef.id);
		} else {
			const docRef = doc(collection(firebaseFirestore, FLATS_COLLECTION_NAME));
			await setDoc(docRef, data);
			if (!docRef)
				throw new Error(
					"Something went wrong while creating the user document!"
				);
			console.log("Document written with ID: ", docRef.id);
		}
	} catch (e) {
		console.error("Error saving document: ", e);
		showToaster(
			"error",
			`Error ${isEdit ? "updating" : "adding"} flat document`
		);
	}
};

export const deleteFlatDocument = async (id) => {
	const batch = writeBatch(firebaseFirestore);

	try {
		// Step 1: Delete the flat document
		const flatDocRef = doc(firebaseFirestore, FLATS_COLLECTION_NAME, id);
		batch.delete(flatDocRef);

		// Step 2: Retrieve users who have this flat ID in their favoriteFlats array
		const usersCollectionRef = collection(
			firebaseFirestore,
			USERS_COLLECTION_NAME
		);
		const usersQuery = query(
			usersCollectionRef,
			where("favoriteFlats", "array-contains", id)
		);
		const usersSnapshot = await getDocs(usersQuery);

		// Update each user's document to remove the flat ID from favoriteFlats
		usersSnapshot.forEach((userDoc) => {
			const userRef = doc(firebaseFirestore, USERS_COLLECTION_NAME, userDoc.id);
			batch.update(userRef, {
				favoriteFlats: arrayRemove(id),
			});
		});

		// Commit the batch
		await batch.commit();

		showToaster(
			"success",
			`Deleted flat ${id} and updated user favorites successfully`
		);
	} catch (error) {
		console.error("Error deleting document: ", error);
		showToaster("error", "Error deleting flat document");
	}
};

export const toggleFavoriteFlat = async (flatId, userId) => {
	console.log(flatId, userId);
	console.log("toggleFavoriteFlat");

	try {
		const userDocRef = doc(firebaseFirestore, USERS_COLLECTION_NAME, userId);
		const userDocSnap = await getDoc(userDocRef);
		if (userDocSnap.exists()) {
			const userData = userDocSnap.data();
			const currentFavorites = userData.favoriteFlats || [];
			const updatedFavorites = currentFavorites.includes(flatId)
				? currentFavorites.filter((id) => id !== flatId)
				: [...currentFavorites, flatId];

			await updateDoc(userDocRef, { favoriteFlats: updatedFavorites });
		} else {
			console.error("User document not found");
		}
	} catch (error) {
		console.error("Error updating favorite status: ", error);
		showToaster("error", "Error updating favorite status");
	}
};

export const getApartments = async (setApartments, { filter, uid }) => {
	console.log(filter, uid);

	const flatsCollection = collection(firebaseFirestore, FLATS_COLLECTION_NAME);
	let flatsQuery;

	try {
		switch (filter) {
			case FILTER_TABEL_MAP.ALLFLATS:
				flatsQuery = flatsCollection;
				break;

			case FILTER_TABEL_MAP.MYFLATS:
				flatsQuery = query(flatsCollection, where("userUID", "==", uid));
				break;

			case FILTER_TABEL_MAP.FAVORITES: {
				const userDocRef = doc(firebaseFirestore, USERS_COLLECTION_NAME, uid);
				const userDocSnap = await getDoc(userDocRef);

				if (!userDocSnap.exists()) {
					showToaster("error", "User doesn't exist");
					return;
				}

				const userData = userDocSnap.data();
				const userFavorites = userData.favoriteFlats || [];
				if (userFavorites.length === 0) return setApartments([]);
				if (userFavorites.length <= MAX_BATCH_SIZE) {
					flatsQuery = query(
						flatsCollection,
						where(documentId(), "in", userFavorites)
					);
				} else {
					const queries = [];
					for (let i = 0; i < userFavorites.length; i += MAX_BATCH_SIZE) {
						const batch = userFavorites.slice(i, i + MAX_BATCH_SIZE);
						queries.push(
							query(flatsCollection, where(documentId(), "in", batch))
						);
					}
					await fetchDocuments(queries, setApartments);
					return;
				}
				break;
			}

			default:
				showToaster("error", "Invalid filter");
				return;
		}

		if (!flatsQuery) {
			showToaster("error", "Query not found");
			return;
		}

		const unsubscribe = onSnapshot(
			flatsQuery,
			(querySnapshot) => {
				const docsArray = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				setApartments(docsArray);
			},
			(error) => {
				console.error("Error getting documents: ", error);
				showToaster("error", "Error getting flats documents");
			}
		);

		return unsubscribe;
	} catch (error) {
		console.error("Error processing query: ", error);
		showToaster("error", "Error processing query");
	}
};

const fetchDocuments = async (queries, setApartments) => {
	try {
		const results = await Promise.all(queries.map((q) => getDocs(q)));
		const docsArray = results.flatMap((result) =>
			result.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		);
		setApartments(docsArray);
	} catch (error) {
		console.error("Error fetching documents: ", error);
		showToaster("error", "Error fetching documents");
	}
};
