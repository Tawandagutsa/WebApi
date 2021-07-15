var firebase = require("firebase");

//configure firebase
var firebaseConfig = {
    apiKey: "AIzaSyDtsa4OJbgCZLrAHt6AcRURvyO3pBHDO7I",
    authDomain: "projectdemo1-53590.firebaseapp.com",
    databaseURL: "https://projectdemo1-53590-default-rtdb.firebaseio.com",
    projectId: "projectdemo1-53590",
    storageBucket: "projectdemo1-53590.appspot.com",
    messagingSenderId: "881023521435",
    appId: "1:881023521435:web:4576cfe4160dae78046c3e",
    measurementId: "G-C995XR59GL"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


module.exports = firebase;