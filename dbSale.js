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

const selectElement = document.getElementById("company");
const customInputContainer = document.getElementById("customInputContainer");
const customCompanyInput = document.getElementById("customCompanyInput");
var purchaseData
var purchaseDataKeys

selectElement.addEventListener("change", function () {
  if (selectElement.value === "other") {
    customInputContainer.style.display = "block";
  } else {
    customInputContainer.style.display = "none";
  }
});




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
var totalsale = document.getElementById("totalSale")
var totalQty = document.getElementById("totalQty")
var totalsaleprice = document.getElementById("totalSalePrice")

var ts = 0
var tq = 0
var tsp = 0

function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based, so we add 1.
    const year = now.getFullYear();
    
    return `${day}/${month}/${year}`;
}
  const starCountRef = ref(database, 'salesMC');
  // get today date in format dd/mm/yyyy
    const today = getFormattedDate();
    var serialNo = 0
  onValue(starCountRef, (snapshot) => {
      console.log("hello")
      document.getElementById("detailsBody1").innerHTML = ""
      document.getElementById("totalSale").innerHTML = ""
document.getElementById("totalQty").innerHTML = ""
document.getElementById("totalSalePrice").innerHTML = ""
    const data = snapshot.val();
    try{var keyss = Object.keys(data)
    for(var i = 0; i < keyss.length; i++){
        if(data[keyss[i]].date == today){
    const row = document.createElement("tr");
    const sNo = document.createElement("td");
    const date = document.createElement("td");
    const company = document.createElement("td");
    const phone = document.createElement("td");
    const quantity = document.createElement("td");
    const sale_price = document.createElement("td");
    const total_sale_price = document.createElement("td");
    const imei = document.createElement("td");

    
    sNo.innerHTML = serialNo+1
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
    
    serialNo = serialNo+1
    
    document.getElementById("detailsBody1").appendChild(row)
    ts = ts + parseInt(data[keyss[i]].sale_price)
    tq = tq + parseInt(data[keyss[i]].quantity)
    tsp = tsp + parseInt(data[keyss[i]].total_sale_price)
    console.log(tsp)
    localStorage.setItem("total_sale_price",tsp)

    totalsale.innerHTML = ts
    totalQty.innerHTML = tq
    totalsaleprice.innerHTML = tsp
    keyscount = data[keyss[i]].id
    }
    }}
    catch(e){
    console.log(e)
    }

});




function addSale(){
   try{
    console.log(keyscount)
    key1 = keyscount[4]
    key2 = keyscount[3]
    key3 = keyscount[2]
    key4 = keyscount[1]
    key5 = keyscount[0]
    console.log("from try block")  
} 
catch(e){
    console.log(e)
    key1 = 0
    key2 = 0
    key3 = 0
    key4 = 0
    key5 = 0
    console.log("from catch block")  
}
    key = "sales"
    key1++
    if(key1 > 9){
        key1 = 0
        key2++
    }else if(key2 > 9){
        key2 = 0
        key3++
    }else if(key3 > 9){
        key3 = 0
        key4++
    }else if(key4 > 9){
        key4 = 0
        key5++
    }
    var keycount =key5 +"" + key4 +""+key3+""+key2+""+key1
    var keyid = key+keycount.toString()
    // i want to use current date
    const date = getFormattedDate();
    var company = document.getElementById("company").value
    if (company === "other") {
        company = document.getElementById("customCompanyInput").value
    }
    const salePr = document.getElementById("salePr").value
    const qty = document.getElementById("qty").value
    const totalSalepr = salePr * qty
    const imei = document.getElementById("imei").value
    var IMEI = imei.split('\n')
    const phoneNo = document.getElementById("mobNo").value

    var found = false;
    var purchasePrices = {};
    for (var i = 0; i < IMEI.length; i++) {
        for (var j = 0; j < purchaseDataKeys.length; j++) {
            var purchase = purchaseData[purchaseDataKeys[j]];
            if (purchase.imei.includes(IMEI[i])) {
                purchasePrices[IMEI[i]] = purchase.purchase_price;
                found = true;
                break;
            }
        }
    
    }
    // for(i=0; i<IMEI.length; i++){
    //     if(IMEI[i] in purchasePrices){
    //         console.log(purchasePrices[IMEI[i]]);
    //     }
    // }
    
    
    const salesRef = ref(database, 'salesMC/'+keyid);
    const saleData = {
        date: date,
        company: company,
        phone: phoneNo,
        quantity: qty,
        sale_price: salePr,
        total_sale_price: totalSalepr,
        imei: IMEI,
        id: keycount,
        purchase_price: purchasePrices
        // profitLoss: totalSalepr - (purchasePrice * qty)
    };
    set(salesRef, saleData);
    // window.location.href = "./sale.html"
    // now remove data of variables to entera gain new data
    document.getElementById("company").value = ''
    document.getElementById("customCompanyInput").value = ''
    document.getElementById("salePr").value = ''
    document.getElementById("qty").value = ''
    document.getElementById("imei").value = ''
    
    document.getElementById("mobNo").value = ''
    decrementInStock(company,qty,IMEI)

    // window.location.reload()
    console.log("done")
    
    
}


const addSaleBtn = document.getElementById("saleBtn")
addSaleBtn.addEventListener("click", addSale)


const purchaseRef = ref(database, 'purchasesMC');
onValue(purchaseRef, (snapshot) => {
    var checkList = []
    const data = snapshot.val();
    purchaseData = data
    console.log(purchaseData)
      try{
        var keyss = Object.keys(data)
        purchaseDataKeys = keyss
      for(var i = 0; i < keyss.length; i++){
        if(checkList.includes(data[keyss[i]].company)){
            console.log("already exists")
        }else{
            selectElement.innerHTML += `<option value="${data[keyss[i]].company}">${data[keyss[i]].company}</option>`
            checkList.push(data[keyss[i]].company)
        }
        
        
        console.log(data[keyss[i]].company)
    }
}catch(e){
    console.log(e)
}
    //  add another option to come in last for other company
    selectElement.innerHTML += `<option value="other">Other</option>`

},{
    onlyOnce: true
})


async function decrementInStock(company,qty,imei){
    var imeiStock = []
    const starCountRef = ref(database, "stockMC/"+company);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
    //   console.log(data.quantity)
    try{
    for(var o = 0; o<data.imei.length; o++){
        for(var g = 0; g<imei.length;g++){
            if(parseInt(data.imei[o]) == imei[g]){
                imeiStock.push(data.imei[o])
            }
            
        }
    }
    var resultArray = data.imei.filter(function (item) {
        return !imeiStock.includes(item);
    });
    let qtys = data.quantity - qty
    const stockData = {
        company: data.company,
        quantity: qtys,
        imei: resultArray,
        id: data.company,
    };
    set(starCountRef, stockData);
    console.log(stockData)
}catch(e){
    console.log(e)
}
    },{
        onlyOnce: true,
    });   
}
decrementInStock("iphone 6s",1,[421018765432])