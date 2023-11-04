import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
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
const database = getDatabase(app);
const analytics = getAnalytics(app);
var keyscount
var key = "loan"
var key1 = 0
var key2 = 0
var key3 = 0
var key4 = 0
var key5 = 0
var keycount =key5 +"" + key4 +""+key3+""+key2+""+key1

function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based, so we add 1.
    const year = now.getFullYear();
    
    return `${day}/${month}/${year}`;
}

function sumList(list) {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum += parseInt(list[i]);
    }
    return sum;
}

  const starCountRef = ref(database, 'salesMC');
  // get today date in format dd/mm/yyyy
    const today = getFormattedDate();
    var serialNo = 0
  onValue(starCountRef, (snapshot) => {
      console.log("hello")
      document.getElementById("detailsBody1").innerHTML = ""
      
    const data = snapshot.val();
    console.log(data)
    try{var keyss = Object.keys(data)
    for(var i = 0; i < keyss.length; i++){
    const row = document.createElement("tr");
    const sNo = document.createElement("td");
    const date = document.createElement("td");
    const company = document.createElement("td");
    const phone = document.createElement("td");
    const quantity = document.createElement("td");
    const sale_price = document.createElement("td");
    const total_sale_price = document.createElement("td");
    const imei = document.createElement("td");

    var purchaseLists = Object.values(data[keyss[i]].purchase_price)
    var total_purchase = sumList(purchaseLists)
    // var total_purchase = data[keyss[i]].purchase_price
    // console.log(total_purchase)

    sNo.innerHTML = serialNo+1
    date.innerHTML = data[keyss[i]].date
    company.innerHTML = data[keyss[i]].company
    sale_price.innerHTML = data[keyss[i]].sale_price
    phone.innerHTML = data[keyss[i]].total_sale_price - total_purchase
    quantity.innerHTML = data[keyss[i]].quantity
    // total_sale_price.innerHTML = data[keyss[i]].total_sale_price
    // imei.innerHTML = data[keyss[i]].imei
    var select = document.createElement("select")
    select.setAttribute("id","imeiSelect")
    select.setAttribute('data-bs-theme','dark')
    select.setAttribute("class","form-select text-light")
    console.log(data[keyss[i]].imei)
    for(var k = 0; k<data[keyss[i]].imei.length; k++){
        var op = document.createElement("option")
        op.value = data[keyss[i]].imei[k]
        op.text = data[keyss[i]].imei[k]
        console.log(data[keyss[i]].imei[k])
        select.appendChild(op)
    }
    imei.appendChild(select)
    row.appendChild(sNo)
    row.appendChild(date)
    row.appendChild(company)
    // row.appendChild(sale_price)
    row.appendChild(quantity)
    // row.appendChild(total_sale_price)
    row.appendChild(imei)
    row.appendChild(phone)
    
    serialNo = serialNo+1
    document.getElementById("detailsBody1").appendChild(row)
    
    }}
    catch(e){
    console.log(e)
    }

});




