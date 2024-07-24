import { firebaseAuth } from "../firebase-service";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { updateProfile } from "firebase/auth";
import { createUserDocument } from "../firestore/firestore-service";

import showToaster, { toasterType } from "../../toaster-service";

import { formatDisplayName } from "../../../utils/transform-pipes";
import getErrorMessage from "../../../utils/firebase-errors-translator";

export const createUserAuthentication = async (userData) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			firebaseAuth,
			userData.email,
			userData.password
		);
		const user = userCredential.user;
		const displayName = formatDisplayName(
			userData.firstName,
			userData.lastName
		);
		await updateProfile(user, {
			displayName: displayName,
		});
		console.log(user);
		await createUserDocument(userData);
		showToaster(toasterType.success, "Created user successfuly!");
		return user;
	} catch (error) {
		let errorMessage;
		if (error instanceof FirebaseError) {
			errorMessage = getErrorMessage(error.code);
		} else {
			errorMessage = "An unexpected error occurred";
		}
		showToaster(toasterType.error, errorMessage);
		return error;
	}
};

export const signIn = async (userData) => {
	console.log("User Sign In Started ! ");
	try {
		const userCredential = await signInWithEmailAndPassword(
			firebaseAuth,
			userData.email,
			userData.password
		);
		const user = userCredential.user;

		showToaster(toasterType.success, "Login successfuly!");
		console.log(userCredential);
		return user;
	} catch (error) {
		console.log(error instanceof FirebaseError);
		let errorMessage;
		if (error instanceof FirebaseError) {
			console.log(error.code);
			errorMessage = getErrorMessage(error.code);
		} else {
			errorMessage = "An unexpected error occurred";
		}
		showToaster(toasterType.error, errorMessage);
		return error;
	}
};

export const signUserOut = async () => {
	console.log("User Sign Out Started ! ");
	try {
		await signOut(firebaseAuth);
	} catch (error) {
		if (error instanceof FirebaseError) {
			const errorCode = error.code;
			const errorMessage = error.message;
			// add notification
			console.log(errorCode, errorMessage);
		} else {
			console.log("An unexpected error occurred", error);
		}
	}
};
