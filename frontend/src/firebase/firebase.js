import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'
//connection with fire base this below configuration is given by firebase database
const firebaseConfig = {

    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STOBUCK,
    messagingSenderId: process.env.REACT_APP_MSGID,
    appId: process.env.REACT_APP_APPID,

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
