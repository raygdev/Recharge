import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC4Wi6v1b6kqqbiUqEPG88e-JN-uCkTn-U",
  authDomain: "recharge-fdea0.firebaseapp.com",
  projectId: "recharge-fdea0",
  storageBucket: "recharge-fdea0.appspot.com",
  messagingSenderId: "273668071625",
  appId: "1:273668071625:web:6600b76859f262767dad18"
};


const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const projectRef = collection(database, 'projects')
const skillsRef = collection(database, 'skills')

const getData = async (ref)=> {
  const currentRef = ref == 'projects' ? projectRef 
    : ref == 'skills' ? skillsRef 
    : null;

  const querySnapShot = await getDocs(currentRef)
  const dataArr = querySnapShot.docs.map(doc => ({
    ...doc.data(),
    id:doc.id
  }))
  return dataArr;
}

const addData = (ref, dataObj)=>{
  const currentRef = ref == 'projects' ? projectRef 
    : ref == 'skills' ? skillsRef 
    : null;
    
  addDoc(currentRef, dataObj)
.then(()=>{
    alert('data added')
})
.catch((error)=>{
    throw new Error(error)
})
}

export { app, getData, addData }