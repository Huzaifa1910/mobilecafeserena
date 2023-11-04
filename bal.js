import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
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
var bal = []
var openBalance


function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1.
    const year = date.getFullYear();
  
    return `${month}-${day}-${year}`;
  }
  
// Example usage:
const today = new Date();
console.log(today)
const formattedDate = formatDate(today);
console.log(formattedDate); // Output will be in the "dd-mm-yyyy" format.

function formatDateYest(date) {
    date.setDate(date.getDate() - 1); // Subtract one day from the provided date
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}-${day}-${year}`;
  }
  
  // Example usage:
  const yesterday = formatDateYest(new Date(today)); // Pass the 'today' date
  
  
  const purchaseRef = ref(database, 'balance/' + yesterday);
  console.log(yesterday); // Output will be the date for yesterday in "dd-mm-yyyy" format
  var openRef = ref(database, 'balance');
    var setOpen
    await onValue(openRef, (snapshot) => {
        const data = snapshot.val();
          try{
            var keyss = Object.keys(data)
            setOpen = keyss
              var values = Object.values(data)
              
              const tableBody = document.getElementById("detailsBody1");
              let count = 1;
              for (let i = 0; i < keyss.length; i++) {
                  const row = tableBody.insertRow();
                  const countCell = row.insertCell();
                  countCell.textContent = count;
                  const keyCell = row.insertCell();
                  keyCell.textContent = keyss[i];
                  const openingBalCell = row.insertCell();
                  openingBalCell.textContent = values[i].openingBal;
                  const closingBalCell = row.insertCell();
                  closingBalCell.textContent = values[i].closingBal;
                  count++;
              }
              
            // console.log(data)       
            // bal.push(data.openingBal)
            // console.log(data.closingBal)
            // setOpen = data.closingBal
    }catch(e){
        console.log(e)
    }
    },{
        onlyOnce: true
    })
await onValue(purchaseRef, (snapshot) => {
    const data = snapshot.val();
      try{
        console.log(data)       
        bal.push(data)
        var keyss = Object.keys(data)
        console.log(keyss)
        // console.log(data.openingBal)
        if(setOpen.includes(formattedDate)){
            console.log("already exists")
        }
        else{
        const balRef = ref(database, 'balance/' + formattedDate);
        const balData = {
            // date: today,
            openingBal: bal[0].closingBal,
            closingBal: 0
        };
    }
        set(balRef, balData);
    
}catch(e){
    console.log(e)
}
},{
    onlyOnce: true
})




// adding opening balance
var openBal = document.getElementById("openingBal")
var closeBal = document.getElementById("closingBal")
// openBal.value = 0
console.log(bal)
setTimeout(() => {
    if(bal[0] == null){
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
        var openBalance = parseInt(prompt("Enter opening balance"))
        var closeBalance = parseInt(prompt("Enter Closing balance"))
        localStorage.setItem("openBalance",true)
        // save opening balance on firebase database 
        const balRef = ref(database, 'balance/' + yesterday);
        const balData = {
            // date: today,
            openingBal: openBalance,
            closingBal: closeBalance
        };
        set(balRef, balData);
        var totalSale = parseInt(localStorage.getItem("total_sale_price"))
        var totalPurchase = parseInt(localStorage.getItem("total_purchase_price"))
        
        openBal.value = openBalance
        // closeBal.value = closeBalance
        closeBal.value = openBalance + totalSale - totalPurchase
        
    }
    else{
        var openBalance = parseInt(bal[0].closingBal)
        // var closeBalance = parseInt(bal[0].closingBal)
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
        var totalSale = parseInt(localStorage.getItem("total_sale_price"))
        var totalPurchase = parseInt(localStorage.getItem("total_purchase_price"))
        console.log(openBalance , totalSale , totalPurchase)
        const balRef = ref(database, 'balance/' + formattedDate);
        const balData = {
            // date: today,
            openingBal: openBalance,
            closingBal: openBalance + totalSale - totalPurchase
        };
        set(balRef, balData);
        // openBal.value = openBalance + totalSale - totalPurchase
        openBal.value = openBalance 
        // closeBal.value = closeBalance
        closeBal.value = openBalance + totalSale - totalPurchase
        console.log(openBal.value)
    }
}, 2000);
// console.log(openBalance , totalSale , totalPurchase)
// save true for opening balance into local storage and write check if its already written dont rewrite by making it false
