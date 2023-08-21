import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4Wi6v1b6kqqbiUqEPG88e-JN-uCkTn-U",
  authDomain: "recharge-fdea0.firebaseapp.com",
  projectId: "recharge-fdea0",
  storageBucket: "recharge-fdea0.appspot.com",
  messagingSenderId: "273668071625",
  appId: "1:273668071625:web:6600b76859f262767dad18"
};


const app = initializeApp(firebaseConfig);

export { app }