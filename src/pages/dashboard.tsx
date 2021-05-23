import { useEffect } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import { useUser } from "../hooks/use-user";
import { LoggedInUserContext } from "../context/logged-in-user";
import Firebase from "firebase";

type DashboardProps = {
  user: Firebase.User;
};

const Dashboard: React.FC<DashboardProps> = ({ user: loggedInUser }) => {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user: user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

export default Dashboard;
