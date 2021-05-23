import { createContext } from "react";
import Firebase from "firebase";

export const UserContext = createContext<
  { user: Firebase.User } | { user: null }
>({ user: null });
