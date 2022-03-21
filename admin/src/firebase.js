import firebase from 'firebase';

const firebaseConfig = {
    // apiKey: "AIzaSyCnFO86FEaoBzPZ-TGugAzFmfW7_7U89eA",
    // authDomain: "movie-75b8c.firebaseapp.com",
    // projectId: "movie-75b8c",
    // storageBucket: "movie-75b8c.appspot.com",
    // messagingSenderId: "616951094827",
    // appId: "1:616951094827:web:bd8a3e57d77c1b0d58146e",
    // measurementId: "G-Q674F2JVNP"

    apiKey: "AIzaSyBhVRsISue9A7eFRVTiROUbNUPyYl27Iow",
    authDomain: "movie-1-e4bab.firebaseapp.com",
    projectId: "movie-1-e4bab",
    storageBucket: "movie-1-e4bab.appspot.com",
    messagingSenderId: "824329567882",
    appId: "1:824329567882:web:28304654563565104c3773",
    measurementId: "G-C0LHP2DYY3"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;