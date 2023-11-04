let islogin = localStorage.getItem("isLogin")
if(islogin != 1){
    window.location.href = "./index.html"
}
else{
    console.log("not logged in")
}




import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

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
const analytics = getAnalytics(app);
const database = getDatabase(app);
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

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1.
    const year = date.getFullYear();
  
    return `${month}-${day}-${year}`;
  }

function setBalance(){
    
    // check if total_purchase_price is null or undefined
    if (localStorage.getItem('total_purchase_price') == null || localStorage.getItem('total_purchase_price') == undefined) {
        alert("Today's purchase is not defined");
        return;
    }

    // check if total_sale_price is null or undefined
    if (localStorage.getItem('total_sale_price') == null || localStorage.getItem('total_sale_price') == undefined) {
        alert("Today's sale is not defined");
        return;
    }
    
    var openingBal = document.getElementById("openingBal")
    var openingBalVal = openingBal.value
    var closingBal = document.getElementById("closingBal")
    var closingBalVal = closingBal.value

    const today = new Date();
    const formattedDate = formatDate(today);

    const balRef = ref(database, 'balance/' + formattedDate);
    set(balRef, {
        openingBal: openingBalVal,
        closingBal: closingBalVal
    });


    // remove total_purchase_price from local storage
    // localStorage.removeItem("total_purchase_price")
    // localStorage.removeItem("total_sale_price")
    // set total_purchase_price to 0
    localStorage.setItem("total_purchase_price",0)
    localStorage.setItem("total_sale_price",0)
    alert("Balance set successfully")
}

// get balanceSetBtn call event setBalance() on click

const balanceSetBtn = document.getElementById("balanceSetBtn")
balanceSetBtn.addEventListener("click", setBalance)
