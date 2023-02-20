// import firebase from 'firebase';
// import 'firebase/auth'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/storage'
// import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDcsqQHNDh4y3K9vnpMBOOpoXPrMGzvSFY",
    authDomain: "olx-clone-41f35.firebaseapp.com",
    projectId: "olx-clone-41f35",
    storageBucket: "olx-clone-41f35.appspot.com",
    messagingSenderId: "1040534457769",
    appId: "1:1040534457769:web:ce24dc2b3b4042849348b8"
  };

//  export default firebase.initializeApp(firebaseConfig)

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const db = getFirestore(app)
// export {db}

