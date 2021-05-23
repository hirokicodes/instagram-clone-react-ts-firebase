import { firebase, FieldValue } from "../lib/firebase";
import Firebase from "firebase";

export async function doesUsernameExist(username: string) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.length > 0;
}

type UserDocument = {
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: number;
};

interface IUser extends Firebase.firestore.DocumentData {
  docId: string;
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: number;
}

type PhotoDocument = {
  photoId: number;
  userId: string;
  imageSrc: string;
  caption: string;
  likes: string[];
  comments: IPhotoComment[];
  userLatitude: string;
  userLongitude: string;
  dateCreated: number;
};

interface IPhoto extends Firebase.firestore.DocumentData {
  docId: string;
  photoId: number;
  userId: string;
  imageSrc: string;
  caption: string;
  likes: string[];
  comments: IPhotoComment[];
  userLatitude: string;
  userLongitude: string;
  dateCreated: number;
}

interface IPhotoComment {
  displayName: string;
  comment: string;
}

export async function getUserByUserId(userId: string) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const user = result.docs.map((item) => ({
    ...(item.data() as UserDocument),
    docId: item.id,
  }));

  return user[0] as IUser;
}

export async function getPhotos(userId: string, following: string[]) {
  // [5,4,2] => following
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos: IPhoto[] = result.docs.map((photo) => ({
    ...(photo.data() as PhotoDocument),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // photo.userId = 2
      const user = await getUserByUserId(photo.userId);
      // nat_geo
      const { username } = user;
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserByUsername(username: string) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...(item.data() as UserDocument),
    docId: item.id,
  }));
}

export async function getUserPhotosByUserId(userId: string) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  return photos;
}

// check all conditions before limit results
export async function getSuggestedProfiles(
  userId: string,
  following: string[]
) {
  const usersCollection = firebase.firestore().collection("users");
  let query;

  if (following.length > 0) {
    query = usersCollection.where("userId", "not-in", [...following, userId]);
  } else {
    query = usersCollection.where("userId", "!=", userId);
  }
  const result = await query.limit(10).get();

  const profiles = result.docs.map((user) => ({
    ...(user.data() as UserDocument),
    docId: user.id,
  }));

  return profiles;
}

export async function isUserFollowingProfile(
  loggedInUserUsername: string,
  profileUserId: string
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername) // karl (active logged in user)
    .where("following", "array-contains", profileUserId)
    .get();

  // const [response] = result.docs.map((item) => ({
  //   ...(item.data() as UserDocument),
  //   docId: item.id,
  // }));

  return result.size > 0;
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId: string, // currently logged in user document id (karl's profile)
  profileId: string, // the user that karl requests to follow
  isFollowingProfile: boolean // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  profileDocId: string, // currently logged in user document id (karl's profile)
  loggedInUserDocId: string, // the user that karl requests to follow
  isFollowingProfile: boolean // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export async function toggleFollow(
  isFollowingProfile: boolean,
  activeUserDocId: string,
  profileDocId: string,
  profileUserId: string,
  followingUserId: string
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}
