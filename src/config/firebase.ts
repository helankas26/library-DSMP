import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBTOC_rCyFd02nPQk7upht7t5scXTINk1I",
    authDomain: "library-dsmp.firebaseapp.com",
    projectId: "library-dsmp",
    storageBucket: "library-dsmp.appspot.com",
    messagingSenderId: "1011905466181",
    appId: "1:1011905466181:web:b07ffc226d0845f092f82c",
    measurementId: "G-8J5L0SX5QF"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const storage = firebase.storage();
export default firebase;