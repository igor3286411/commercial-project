// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQqL9vfoboxMc3xEaxIoBkyaRAl_IZNew",
  authDomain: "dopshy-arena.firebaseapp.com",
  projectId: "dopshy-arena",
  storageBucket: "dopshy-arena.appspot.com",
  messagingSenderId: "106638429446",
  appId: "1:106638429446:web:68aa68ff8c089691f96287",
  measurementId: "G-HV8S6B53J4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);