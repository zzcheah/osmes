import { NotificationManager } from "react-notifications";
import { getFirestore } from "redux-firestore";

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
    dispatch(toggleLoading());

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
        createdAt: firestore.Timestamp.fromDate(new Date()),
      })
      .then((resp) => {
        const productId = resp.id;

        if (images.length !== 0) {
          images.forEach((image) => {
            const filePath = `images/${productId}/${image.name}`;
            const uploadTask = storage.ref(filePath).put(image);

            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                throw error;
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  firestore
                    .collection("products")
                    .doc(productId)
                    .update({
                      images: firestore.FieldValue.arrayUnion({
                        name: image.name,
                        url: downloadURL,
                        path: filePath,
                      }),
                    });
                });
              }
            );
          });
        }
        NotificationManager.success("Product Added");
        dispatch(toggleLoading());
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message);
        dispatch(toggleLoading());
      });
  };
};

export const rateProduct = (product) => {
  return (dispatch, getState) => {
    const firestore = getFirestore();
    firestore
      .collection("products")
      .add({})
      .then(() => {
        dispatch({ type: "RATE_PRODUCT", product });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "RATE_PROJECT_ERROR", err });
      });
  };
};
