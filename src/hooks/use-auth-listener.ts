import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import Firebase from "firebase";

export default function useAuthListener() {
  const localStorageAuthUser = localStorage.getItem("authUser");
  const [user, setUser] = useState<Firebase.User | null>(
    localStorageAuthUser ? JSON.parse(localStorageAuthUser) : null
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // we have a user...therefore we can store the user in localstorage
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // we don't have an authUser, therefore clear the localstorage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user } as { user: Firebase.User };
}
