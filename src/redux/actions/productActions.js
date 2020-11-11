import { NotificationManager } from "react-notifications";

import { toggleLoading } from "./appActions";

// export const loginAction = (credentials) => {
//   return (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();

//     firebase
//       .auth()
//       .signInWithEmailAndPassword(credentials.email, credentials.password)
//       .then(() => {
//         NotificationManager.success("Login Success");
//       })
//       .catch((err) => {
//         NotificationManager.error(err.message);
//       });
//   };
// };

export const addProduct = (product, images, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // dispatch(toggleLoading());

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    const storage = getFirebase().storage();

    firestore
      .collection("products")
      .add({
        ...product,
        seller: userId,
        sellerName: profile.firstName + " " + profile.lastName,
        createdAt: new Date(),
      })
      .then((resp) => {
        const productId = resp.id;

        if (images.length !== 0) {
          images.forEach((image) => {
            console.log(image.name);
            const uploadTask = storage
              .ref(`images/${productId}/${image.name}`)
              .put(image);

            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                throw error;
              },
              () => {
                console.log("haha");
                uploadTask.snapshot.ref.getDownloadURL().then((x) => {
                  firestore
                    .collection("products")
                    .doc(productId)
                    .update({
                      urls: firestore.FieldValue.arrayUnion(x),
                    });
                });
              }
            );
          });
        }
        NotificationManager.success("Product Added");
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message);
      });
  };
};
