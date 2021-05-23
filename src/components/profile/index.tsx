import { useReducer, useEffect } from "react";
import Header from "./header";
import Photos from "./photos";
import { getUserPhotosByUserId } from "../../services/firebase";

interface ProfileProps {
  user: {
    userId: string;
    username: string;
    fullName: string;
    emailAddress: string;
    following: string[];
    followers: string[];
    dateCreated: number;
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const reducer = (state: any, newState: any) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
};

export default Profile;
