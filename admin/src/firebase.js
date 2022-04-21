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

    apiKey: "AIzaSyAub7Nk30trrUWe0a0qJiGGd7TR_28Ay-4",
    authDomain: "movie-5-472b3.firebaseapp.com",
    projectId: "movie-5-472b3",
    storageBucket: "movie-5-472b3.appspot.com",
    messagingSenderId: "934133227708",
    appId: "1:934133227708:web:bb71e1e8c011bffba4b0b9",
    measurementId: "G-X2NS6R7NXT"

    // apiKey: "AIzaSyAeUIDVZyeaOmECLJj49WQUPVKMjBTblr8",
    // authDomain: "movie-6-efbb4.firebaseapp.com",
    // projectId: "movie-6-efbb4",
    // storageBucket: "movie-6-efbb4.appspot.com",
    // messagingSenderId: "780008322135",
    // appId: "1:780008322135:web:6bb18e2687d6273f025f12",
    // measurementId: "G-Z15KP6JH05"

    // apiKey: "AIzaSyBojvSmU0ce38Zwo0tB7wAOluchpKhF3D0",
    // authDomain: "movie-7-beb87.firebaseapp.com",
    // projectId: "movie-7-beb87",
    // storageBucket: "movie-7-beb87.appspot.com",
    // messagingSenderId: "1025405403342",
    // appId: "1:1025405403342:web:72ef0b3ec7e5a846ea109f",
    // measurementId: "G-1VS7DWZDWT"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;