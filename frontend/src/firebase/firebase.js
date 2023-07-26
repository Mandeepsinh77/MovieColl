import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'
//connection with fire base this below configuration is given by firebase database
const firebaseConfig = {
    apiKey: "AIzaSyAAknpzFYp8Sofo-PO4i9W0DyKWXwFW-6s",
    authDomain: "moviecoll-3338d.firebaseapp.com",
    projectId: "moviecoll-3338d",
    storageBucket: "moviecoll-3338d.appspot.com",
    messagingSenderId: "537889031817",
    appId: "1:537889031817:web:05d74452e427baacdf2858"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
/* getFirestore() method will be use to find a our database from the firestore(firebase)
 db find over database so database name is MovieColl ,so db attached with MovieColl

 now moviesRef is a reference of document in database MovieColl
 collection method take two parameter one database name and another is document(schema) in a that database 
 so movieRef is a reference to connect with the last and
*/
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;