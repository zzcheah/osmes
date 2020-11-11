import { combineReducers } from "redux";
import { firebaseReducer as firebase } from "react-redux-firebase";
import { firestoreReducer as firestore } from "redux-firestore";

import { appReducer as app } from "./appReducer";


export default combineReducers({ firebase, firestore, app });
