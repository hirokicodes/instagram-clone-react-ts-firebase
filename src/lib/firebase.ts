import Firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { config } from "../firebaseconfig";
// import { seedDatabase } from "../seed";

export const firebase = Firebase.initializeApp(config);

export const { FieldValue } = Firebase.firestore;

// seedDatabase(Firebase);
