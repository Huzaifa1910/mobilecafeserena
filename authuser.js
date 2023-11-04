let islogin = localStorage.getItem("isLogin")
if(islogin == 1){
    window.location.href = "./sale.html"
}
else{
    console.log("not logged in")
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInWithPopup, getRedirectResult, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBocLCsnL8aEkTir7bAu5X4_vuWuUKpFXI",
  authDomain: "mobilecafeserena.firebaseapp.com",
  databaseURL: "https://mobilecafeserena-default-rtdb.firebaseio.com",
  projectId: "mobilecafeserena",
  storageBucket: "mobilecafeserena.appspot.com",
  messagingSenderId: "351687233974",
  appId: "1:351687233974:web:25ea3918a45804568cb117",
  measurementId: "G-BQ3ZFYT28X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const authBtn = document.getElementById("authenticateBtn")

function signInGoogle(){
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    localStorage.setItem("isLogin",1)
    console.log(user)
    console.log("done")
    window.location.href = "./sale.html"
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

authBtn.addEventListener("click", signInGoogle)
//   write function to signout user with google authentication firebase sdk
