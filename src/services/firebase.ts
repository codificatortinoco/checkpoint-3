import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc } from "firebase/firestore";
import { Block } from "../flux/Store";

const firebaseConfig = {
  apiKey: "AIzaSyD1lusHCb2VxEkerbIoCLbDJFMtJ8yoo5M",
  authDomain: "checkpoint3-66fc2.firebaseapp.com",
  projectId: "checkpoint3-66fc2",
  storageBucket: "checkpoint3-66fc2.firebasestorage.app",
  messagingSenderId: "94994989886",
  appId: "1:94994989886:web:ca51225e0e50e69e62a26f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getBlocksDb = async () => getDocs(collection(db, "blocks"));

export const addBlockDb = async (block: Block) => {
  const docRef = await addDoc(collection(db, "blocks"), block);
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};


export const registerUserDb = async (username: string, userLetter: string, userColor:string) => {
  const docRef = await addDoc(collection(db, "users"), { username, userLetter, userColor });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};

export const getUsersDb = async () => getDocs(collection(db, "users"));