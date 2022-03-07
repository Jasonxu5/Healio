// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// NOTE: Use Environement Variables once app is deployed to production
const firebaseConfig = {
  apiKey: "AIzaSyAGSZzesnF02c38v_XRDH0ZjtAQnxltI10",
  authDomain: "healio-e7722.firebaseapp.com",
  projectId: "healio-e7722",
  storageBucket: "healio-e7722.appspot.com",
  messagingSenderId: "920066944228",
  appId: "1:920066944228:web:0d00c25c07d1b2c1b890f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth
};

