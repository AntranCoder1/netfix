import firebase from 'firebase';

const firebaseConfig = {
    // apiKey: "AIzaSyBrLNoPxVZdjYiWurtiCSg36xtVbyRLwGs",
    // authDomain: "movie-c66b5.firebaseapp.com",
    // projectId: "movie-c66b5",
    // storageBucket: "movie-c66b5.appspot.com",
    // messagingSenderId: "135972572403",
    // appId: "1:135972572403:web:96a2002d0cc2feb4477b86",
    // measurementId: "G-S305QZD5LT"

    // movie: 18.7GB

    // apiKey: "AIzaSyBhVRsISue9A7eFRVTiROUbNUPyYl27Iow",
    // authDomain: "movie-1-e4bab.firebaseapp.com",
    // projectId: "movie-1-e4bab",
    // storageBucket: "movie-1-e4bab.appspot.com",
    // messagingSenderId: "824329567882",
    // appId: "1:824329567882:web:28304654563565104c3773",
    // measurementId: "G-C0LHP2DYY3"

    // movie-1: 19.4GB

    // apiKey: "AIzaSyAzJXz1a4y6APjJQ4nzuMPtAGoK4SyTyoI",
    // authDomain: "movie-2-b947a.firebaseapp.com",
    // projectId: "movie-2-b947a",
    // storageBucket: "movie-2-b947a.appspot.com",
    // messagingSenderId: "878530739784",
    // appId: "1:878530739784:web:fc58bcde054ab0be7be27d",
    // measurementId: "G-3RZQM6YGQM"

    // apiKey: "AIzaSyBD60kqis1uhAZViUJ-sz06nqfG-ovJHdw",
    // authDomain: "movie-3-b04bb.firebaseapp.com",
    // projectId: "movie-3-b04bb",
    // storageBucket: "movie-3-b04bb.appspot.com",
    // messagingSenderId: "728130310676",
    // appId: "1:728130310676:web:9b86667fcb44953cfa8d01",
    // measurementId: "G-4834RJWD3Q"

    apiKey: "AIzaSyCLfA0jtWNDvvP3GMt1SFu3UVSj0KFCfCc",
    authDomain: "movie-4-6e69b.firebaseapp.com",
    projectId: "movie-4-6e69b",
    storageBucket: "movie-4-6e69b.appspot.com",
    messagingSenderId: "970680082024",
    appId: "1:970680082024:web:78cc02ea66836e0c77e5dd",
    measurementId: "G-R443QWLZN0"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;