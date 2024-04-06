
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBhu_PcZS2AujYAjPr9sEYIulqu8_9bmOk",
//   authDomain: "collaborative-editor-a90e2.firebaseapp.com",
//   projectId: "collaborative-editor-a90e2",
//   storageBucket: "collaborative-editor-a90e2.appspot.com",
//   messagingSenderId: "796701867719",
//   appId: "1:796701867719:web:a1587cee65d4676a2a48e2",
//   measurementId: "G-NV7GSBWHP2"
// };


// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export default app





import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID ,
  storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
  appId: import.meta.env.REACT_APP_FIREBASE_APP_ID
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app