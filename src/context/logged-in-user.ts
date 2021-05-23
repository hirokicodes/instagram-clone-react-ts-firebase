import { createContext } from "react";
import { IUser } from "../types";

interface ILoggedInUserContext {
  user?: IUser;
  setActiveUser?: Function;
}

export const LoggedInUserContext = createContext<ILoggedInUserContext>({});
