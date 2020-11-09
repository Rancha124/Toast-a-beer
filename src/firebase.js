import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCAvfwiQCFTHrawCIZ0-j3xOvljyRwxYpA",
  authDomain: "toast-a-beer.firebaseapp.com",
  databaseURL: "https://toast-a-beer.firebaseio.com",
  projectId: "toast-a-beer",
  storageBucket: "toast-a-beer.appspot.com",
  messagingSenderId: "11636728756",
  appId: "1:11636728756:web:d19b8b3477cafdc42648e1",
  measurementId: "G-C1Z1V0ERYP",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
