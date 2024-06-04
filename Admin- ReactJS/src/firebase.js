// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, child, remove, update, onValue, orderByChild, query, equalTo } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAygy0Sm2E-jj-eXVr5VnEeAa2u7NxFuTM",
  authDomain: "softweb2-44b29.firebaseapp.com",
  databaseURL: "https://softweb2-44b29-default-rtdb.firebaseio.com",
  projectId: "softweb2-44b29",
  storageBucket: "softweb2-44b29.appspot.com",
  messagingSenderId: "355167434229",
  appId: "1:355167434229:web:6f428f2d7458cbc29c1cbc",
  measurementId: "G-5JF0JMFKBT"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, set, get, child, remove, update, onValue, orderByChild, query, equalTo };
export default app;