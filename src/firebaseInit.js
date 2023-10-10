// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC2tqHe0Rz_J_D3-xoS1iRbc3_kYQa4TM",
  authDomain: "buybusy-redux-ec3eb.firebaseapp.com",
  projectId: "buybusy-redux-ec3eb",
  storageBucket: "buybusy-redux-ec3eb.appspot.com",
  messagingSenderId: "150964743743",
  appId: "1:150964743743:web:6028fd45d532b8cfd8528a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);















// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA8J7AFN9h4jXG2K74EW4ONEOYYM53bZ8w",
//   authDomain: "buybusy-redux.firebaseapp.com",
//   projectId: "buybusy-redux",
//   storageBucket: "buybusy-redux.appspot.com",
//   messagingSenderId: "252643386212",
//   appId: "1:252643386212:web:5f4f16318ecebc11955071"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);