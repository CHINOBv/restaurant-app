import app from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
    this.storage = app.storage();
  }
}

const firebase = new Firebase();

export default firebase;
