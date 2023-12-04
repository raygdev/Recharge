// import { initializeApp } from "firebase/app";
import { getFirestore, } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyC4Wi6v1b6kqqbiUqEPG88e-JN-uCkTn-U",
//   authDomain: "recharge-fdea0.firebaseapp.com",
//   projectId: "recharge-fdea0",
//   storageBucket: "recharge-fdea0.appspot.com",
//   messagingSenderId: "273668071625",
//   appId: "1:273668071625:web:6600b76859f262767dad18"
// };


// const app = initializeApp(firebaseConfig);
// const database = getFirestore(app);

// export { app, database }

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw1VZLcwawJMeYjzIOU_wlcN_lVVQ3KRg",
  authDomain: "recharge-5da7d.firebaseapp.com",
  projectId: "recharge-5da7d",
  storageBucket: "recharge-5da7d.appspot.com",
  messagingSenderId: "218341783837",
  appId: "1:218341783837:web:3cb3319f35b529f24c49f4",
  measurementId: "G-WV9Z6Y4F5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
const analytics = getAnalytics(app);

export {database, app}