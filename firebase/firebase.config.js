import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbnDkT_QDzOOUj0PovDoQyPEj5f0hBLfY",
  authDomain: "foodbuddies-cfa98.firebaseapp.com",
  databaseURL: "https://foodbuddies-cfa98-default-rtdb.firebaseio.com",
  projectId: "foodbuddies-cfa98",
  storageBucket: "foodbuddies-cfa98.appspot.com",
  messagingSenderId: "830323081132",
  appId: "1:830323081132:android:8f1c93a6d3e9c5ab84c409",
  // measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
