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

