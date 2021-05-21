import Firebase from "firebase";

// NOTE: replace 'AqvLj5mUqiScguTXhi14DqHfIIB2' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase: typeof Firebase) {
  const users = [
    {
      userId: "AqvLj5mUqiScguTXhi14DqHfIIB2",
      username: "bob",
      fullName: "Bob Smith",
      emailAddress: "bob@email.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "nat_geo",
      fullName: "National Geographic",
      emailAddress: "natgeo@email.com",
      following: [],
      followers: ["AqvLj5mUqiScguTXhi14DqHfIIB2"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "bill",
      fullName: "Bill Gates",
      emailAddress: "billgates@email.com",
      following: [],
      followers: ["AqvLj5mUqiScguTXhi14DqHfIIB2"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "elon",
      fullName: "Elon Musk",
      emailAddress: "elonmusk@email.com",
      following: [],
      followers: ["AqvLj5mUqiScguTXhi14DqHfIIB2"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/nat_geo/${i}.jpg`,
        caption: "A beautiful creature",
        likes: [],
        comments: [
          {
            displayName: "bill",
            comment: "Really cool picture",
          },
          {
            displayName: "elon",
            comment: "Very nice",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}

seedDatabase(Firebase);
