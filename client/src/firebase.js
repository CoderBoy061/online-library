import firebase from "firebase";
const FirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBJe4Z5KP2Hhg5s_vFDCbe8stRDNCeUoE4",
  authDomain: "onlinelibrary-322718.firebaseapp.com",
  projectId: "onlinelibrary-322718",
  storageBucket: "onlinelibrary-322718.appspot.com",
  messagingSenderId: "1080884692512",
  appId: "1:1080884692512:web:c7e1b56a68bd14f0555e45",
});
const db = FirebaseApp.firestore();
export { db };
