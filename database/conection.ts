import firebase from "firebase";
import "firebase/firestore"


var firebaseConfig = {
    apiKey: "AIzaSyA_acpOC0z_bhA9oE-1_KR4kibeNNVZZSI",
    authDomain: "examen-parcial-2-619b8.firebaseapp.com",
    projectId: "examen-parcial-2-619b8",
    storageBucket: "examen-parcial-2-619b8.appspot.com",
    messagingSenderId: "92669609128",
    appId: "1:92669609128:web:9b6b964dfb25c11c1b6e9d"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();



export default {
    firebase,
    db
};