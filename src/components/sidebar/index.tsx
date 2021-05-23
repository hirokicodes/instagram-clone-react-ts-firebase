import { useContext } from "react";
import User from "./user";
import { LoggedInUserContext } from "../../context/logged-in-user";
import Suggestions from "./suggestions";

const Sidebar = () => {
  const { user } = useContext(LoggedInUserContext);

  if (user) {
    const { fullName, username, userId, following, docId } = user;

    return (
      <div className="p-4">
        <User username={username} fullName={fullName} />
        <Suggestions
          userId={userId}
          following={following}
          loggedInUserDocId={docId}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Sidebar;
