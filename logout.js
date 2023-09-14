let islogin = localStorage.getItem("isLogin")
if(islogin != 1){
    window.location.href = "./index.html"
}
else{
    console.log("not logged in")
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBYW4qvOR2wYIXb8Q-HxLuLjjKb8g7WSw0",
    authDomain: "mobilecafe-72ce0.firebaseapp.com",
    databaseURL: "https://mobilecafe-72ce0-default-rtdb.firebaseio.com",
    projectId: "mobilecafe-72ce0",
    storageBucket: "mobilecafe-72ce0.appspot.com",
    messagingSenderId: "172091451763",
    appId: "1:172091451763:web:495ec8f77a21e69026bd06"
};
const app = initializeApp(firebaseConfig);

const signoutBtn = document.getElementById("signoutBtn")

function logOut() {
    const auth = getAuth();
    
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log("signed out")
    localStorage.setItem("isLogin",0)
    window.location.href = "./index.html"
    }).catch((error) => {
    // An error happened.
    });

}
signoutBtn.addEventListener("click", logOut)


// adding opening balance
var openBal = document.getElementById("openingBal")
// openBal.value = 0
if(localStorage.getItem("openBalance") == false){
    var openBalance = prompt(parseInt("Enter opening balance"))
    localStorage.setItem("openBalance",true)
    
}
else{
    var openBalance = 0
}
var totalSale = parseInt(localStorage.getItem("total_sale_price"))
var totalPurchase = parseInt(localStorage.getItem("total_purchase_price"))

openBal.value = openBalance + totalSale - totalPurchase

// save true for opening balance into local storage and write check if its already written dont rewrite by making it false
