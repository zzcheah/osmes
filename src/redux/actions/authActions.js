import { NotificationManager } from "react-notifications";

export const loginAction = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        NotificationManager.success("Login Success");
      })
      .catch((err) => {
        NotificationManager.error(err.message);
      });
  };
};

export const logoutAction = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        firebase.logout();
        NotificationManager.info("Logout Success");
      })
      .catch((err) => {
        NotificationManager.error(err.message);
      });
  };
};

export const signupAction = (newUser, history) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const { firstName, lastName, email, password, phone, gender } = newUser;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          firstName,
          lastName,
          phone,
          gender,
        });
      })
      .then(() => {
        NotificationManager.success("Signup success");
        history.push("/");
      })
      .catch((err) => {
        NotificationManager.error(err.message);
      });
  };
};

export const editUserAction = (editUser, history) => {
  return (dispatch, getState, { getFirebase, getFirestore}) => {
    const firebase = getFirebase ();
    const firestore = getFirestore ();
    const { firstName, lastName, phone } = editUser;
    const user = firebase.auth().currentUser;
    console.log('User ID: ', editUser);
    
    firebase
      .auth()
      .onAuthStateChanged((resp) => {
        if(resp){
          return firestore.collection("users").doc(user.uid).set({
            firstName,
            lastName,
            phone,
          })
          .then(() => {
            NotificationManager.success("Edit success");
            history.push("/login");
          })
          .catch((err) => {
            NotificationManager.error(err.message);
          });
        } else {
          
        }
      //});
      //.updateCurrentUser()
      // .then((resp) => {
      //   return firestore.collection("users").doc(resp.user.uid).set({
      //     firstName,
      //     lastName,
      //     phone,
      //  });
      // })
      // .then(() => {
      //   NotificationManager.success("Edit success");
      //   history.push("/");
      // })
      // .catch((err) => {
      //   NotificationManager.error(err.message);
      // });
    });
  };
};
