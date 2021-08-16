import firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const config = {
  apiKey: "AIzaSyDoaZOXWbve8_Hr3gr8rYRf2fcdD6beevY",
  authDomain: "draaiboek-bdb4c.firebaseapp.com",
  projectId: "draaiboek-bdb4c",
  storageBucket: "draaiboek-bdb4c.appspot.com",
  messagingSenderId: "317506475984",
  appId: "1:317506475984:web:ead5399b0bb47cd5694bd5",
  measurementId: "G-5TTDK4N3FN",
};

class Firebase {
  app: typeof firebaseApp;
  auth: firebaseApp.auth.Auth;
  db: firebaseApp.firestore.Firestore;

  constructor() {
    firebaseApp.initializeApp(config);

    this.app = firebaseApp;
    this.auth = firebaseApp.auth();
    this.db = firebaseApp.firestore();
  }
}

export default new Firebase();
