import Firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { config } from "../firebaseconfig";

export const firebase = Firebase.initializeApp(config);

export const { FieldValue } = Firebase.firestore;
