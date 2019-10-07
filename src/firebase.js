import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCV4QripKpACKORV3Y7BM2L_ocNMRM770E",
  authDomain: "todoist-a54fd.firebaseapp.com",
  databaseURL: "https://todoist-a54fd.firebaseio.com",
  projectId: "todoist-a54fd",
  storageBucket: "todoist-a54fd.appspot.com",
  messagingSenderId: "831888623649",
  appId: "1:831888623649:web:928a0482817048a74cbb60"
});

export { firebaseConfig as firebase };
