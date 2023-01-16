import { initializeApp } from "firebase/app";

// COMPLETE WITH YOUR FIREBASE APP INFO
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };