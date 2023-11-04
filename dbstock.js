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
const database = getDatabase(app);
const analytics = getAnalytics(app);

var totalQty = document.getElementById("totalQty")
var tq = 0

const starCountRef = ref(database, 'stockMC');
  onValue(starCountRef, (snapshot) => {
    document.getElementById("detailsBody1").innerHTML = ""
    totalQty.innerHTML = ""
    // totalpurchase.innerHTML = ""
    // totalpurchaseprice.innerHTML = ""
    const data = snapshot.val();
    console.log(data)
        try{var keyss = Object.keys(data)
        console.log(keyss.length)
        for(var i = 0; i < keyss.length; i++){
            const row = document.createElement("tr");
            const sNo = document.createElement("td");
            const company = document.createElement("td");
        const quantity = document.createElement("td");
        const imei = document.createElement("td");
        
        
        sNo.innerHTML = i+1
        company.innerHTML = data[keyss[i]].company
        quantity.innerHTML = data[keyss[i]].quantity
        var select = document.createElement("select")
        select.setAttribute("id","imeiSelect")
        select.setAttribute('data-bs-theme','dark')
        select.setAttribute("class","form-select text-light")
        console.log(data[keyss[i]].imei)
        for(var k = 0; k < data[keyss[i]].imei.length; k++){
            var op = document.createElement("option")
            op.value = data[keyss[i]].imei[k]
            op.text = data[keyss[i]].imei[k]
            console.log(data[keyss[i]].imei[k])
            select.appendChild(op)
        }
        imei.appendChild(select)
        console.log(data[keyss[i]].imei[0])
        row.appendChild(sNo)
        row.appendChild(company)
        row.appendChild(quantity)
        row.appendChild(imei)
        
        document.getElementById("detailsBody1").appendChild(row)
        tq = tq + parseInt(data[keyss[i]].quantity)
        
        
        totalQty.innerHTML = tq
    }
}
catch(e){
    console.log(e)
}
    
    
});


