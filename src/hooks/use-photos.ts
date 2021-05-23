import { useState, useEffect } from "react";
import { getPhotos } from "../services/firebase";
import { IUser, IPhotoComment } from "../types";

export const usePhotos = (user: IUser | undefined) => {
  const [photos, setPhotos] = useState<
    {
      userLikedPhoto: boolean;
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
      username: any;
    }[]
  >([]);

  async function getTimelinePhotos() {
    // does the user actually follow people?
    if (user!.following.length > 0) {
      const followedUserPhotos = await getPhotos(user!.userId, user!.following);
      // re-arrange array to be newest photos first by dateCreated
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
  }
  useEffect(() => {
    if (user) {
      getTimelinePhotos();
    }
  }, [user?.userId, user?.following]);

  return { photos };
};
