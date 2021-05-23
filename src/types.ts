import Firebase from "firebase";

export interface IUser extends Firebase.firestore.DocumentData {
  docId: string;
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: number;
}

export interface IUserDocument {
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: number;
}

export interface IPhotoDocument {
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

export interface IPhoto extends Firebase.firestore.DocumentData {
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

export interface IPhotoComment {
  displayName: string;
  comment: string;
}
