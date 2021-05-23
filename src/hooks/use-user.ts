import { useState, useEffect } from "react";
import { getUserByUserId } from "../services/firebase";
import { IUser } from "../types";

export const useUser = (userId?: string) => {
  const [activeUser, setActiveUser] = useState<IUser>();

  useEffect(() => {
    async function getUserObjByUserId(userId: string) {
      const user = await getUserByUserId(userId);
      setActiveUser(user);
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
};
