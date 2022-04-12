import firebase from 'firebase';

const firebaseConfig = {

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

    // apiKey: "AIzaSyB_9IfpvsNpyUCicjExVzfz0mOJpyUJdzo",
    // authDomain: "movie-4-2bd2e.firebaseapp.com",
    // projectId: "movie-4-2bd2e",
    // storageBucket: "movie-4-2bd2e.appspot.com",
    // messagingSenderId: "314055103216",
    // appId: "1:314055103216:web:52514d78e5fa7ac8996835",
    // measurementId: "G-XYPNZGMDY4"

    // apiKey: "AIzaSyAgHqV0CFWOMRPWGKsr9xyxi2INX-ldhFQ",
    // authDomain: "movie-5-e7c95.firebaseapp.com",
    // projectId: "movie-5-e7c95",
    // storageBucket: "movie-5-e7c95.appspot.com",
    // messagingSenderId: "17799525260",
    // appId: "1:17799525260:web:c76c28e23b02b2654e1ca9",
    // measurementId: "G-2CHF3V1EXF"

    apiKey: "AIzaSyAeUIDVZyeaOmECLJj49WQUPVKMjBTblr8",
    authDomain: "movie-6-efbb4.firebaseapp.com",
    projectId: "movie-6-efbb4",
    storageBucket: "movie-6-efbb4.appspot.com",
    messagingSenderId: "780008322135",
    appId: "1:780008322135:web:6bb18e2687d6273f025f12",
    measurementId: "G-Z15KP6JH05"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;