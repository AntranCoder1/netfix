import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAzJXz1a4y6APjJQ4nzuMPtAGoK4SyTyoI",
    authDomain: "movie-2-b947a.firebaseapp.com",
    projectId: "movie-2-b947a",
    storageBucket: "movie-2-b947a.appspot.com",
    messagingSenderId: "878530739784",
    appId: "1:878530739784:web:fc58bcde054ab0be7be27d",
    measurementId: "G-3RZQM6YGQM"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;