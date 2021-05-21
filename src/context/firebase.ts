import { createContext } from "react";
import Firebase from "firebase";

interface IFirebaseContext {
  firebase: Firebase.app.App;
  FieldValue: typeof Firebase.firestore.FieldValue;
}

export const FirebaseContext = createContext<IFirebaseContext>(
  {} as IFirebaseContext
);
