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


const starCountRef = ref(database, 'purchasesMC');
  onValue(starCountRef, (snapshot) => {
    document.getElementById("detailsBody2").innerHTML = ""
    // totalQty.innerHTML = ""
    // totalpurchase.innerHTML = ""
    // totalpurchaseprice.innerHTML = ""
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
        const purchase_price = document.createElement("td");
        const total_purchase_price = document.createElement("td");
        const imei = document.createElement("td");
        
        
        sNo.innerHTML = i+1
        date.innerHTML = data[keyss[i]].date
        company.innerHTML = data[keyss[i]].company
        purchase_price.innerHTML = data[keyss[i]].purchase_price
        phone.innerHTML = data[keyss[i]].phone
        quantity.innerHTML = data[keyss[i]].quantity
        total_purchase_price.innerHTML = data[keyss[i]].total_purchase_price
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
        console.log(data[keyss[i]].imei[0])
        row.appendChild(sNo)
        row.appendChild(date)
        row.appendChild(company)
        row.appendChild(purchase_price)
        row.appendChild(quantity)
        row.appendChild(total_purchase_price)
        row.appendChild(imei)
        row.appendChild(phone)
        
        document.getElementById("detailsBody2").appendChild(row)
        // ts = ts + parseInt(data[keyss[i]].purchase_price)
        // tq = tq + parseInt(data[keyss[i]].quantity)
        // tsp = tsp + parseInt(data[keyss[i]].total_purchase_price)
        
        // localStorage.setItem("total_purchase_price", tsp)
        
        // totalpurchase.innerHTML = ts
        // totalQty.innerHTML = tq
        // totalpurchaseprice.innerHTML = tsp
        // keyscount = data[keyss[i]].id
    }
}
catch(e){
    console.log(e)
}
    
    
});




const starCountRef2 = ref(database, 'salesMC');
onValue(starCountRef2, (snapshot) => {
document.getElementById("detailsBody1").innerHTML = ""
    const data = snapshot.val();
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

    
    sNo.innerHTML = i+1
    date.innerHTML = data[keyss[i]].date
    company.innerHTML = data[keyss[i]].company
    sale_price.innerHTML = data[keyss[i]].sale_price
    phone.innerHTML = data[keyss[i]].phone
    quantity.innerHTML = data[keyss[i]].quantity
    total_sale_price.innerHTML = data[keyss[i]].total_sale_price
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
    row.appendChild(sale_price)
    row.appendChild(quantity)
    row.appendChild(total_sale_price)
    row.appendChild(imei)
    row.appendChild(phone)
    
    document.getElementById("detailsBody1").appendChild(row)
    // ts = ts + parseInt(data[keyss[i]].sale_price)
    // tq = tq + parseInt(data[keyss[i]].quantity)
    // tsp = tsp + parseInt(data[keyss[i]].total_sale_price)
    // console.log(tsp)
    // localStorage.setItem("total_sale_price",tsp)

    // totalsale.innerHTML = ts
    // totalQty.innerHTML = tq
    // totalsaleprice.innerHTML = tsp
    // keyscount = data[keyss[i]].id
    }}
    catch(e){
    console.log(e)
    }
    

});
