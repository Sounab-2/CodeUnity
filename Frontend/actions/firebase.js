import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAZaUE5mRaPVfuWdEQr8-GiWY46JwvBRqI",
  authDomain: "collaborative-editor-51786.firebaseapp.com",
  projectId: "collaborative-editor-51786",
  storageBucket: "collaborative-editor-51786.appspot.com",
  messagingSenderId: "249447703184",
  appId: "1:249447703184:web:79c5e86c02a82e63b62e15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
