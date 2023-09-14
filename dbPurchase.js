import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyBYW4qvOR2wYIXb8Q-HxLuLjjKb8g7WSw0",
    authDomain: "mobilecafe-72ce0.firebaseapp.com",
    databaseURL: "https://mobilecafe-72ce0-default-rtdb.firebaseio.com",
    projectId: "mobilecafe-72ce0",
    storageBucket: "mobilecafe-72ce0.appspot.com",
    messagingSenderId: "172091451763",
    appId: "1:172091451763:web:495ec8f77a21e69026bd06"
};

const selectElement = document.getElementById("company");
const customInputContainer = document.getElementById("customInputContainer");
const customCompanyInput = document.getElementById("customCompanyInput");

selectElement.addEventListener("change", function () {
  if (selectElement.value === "other") {
    customInputContainer.style.display = "block";
  } else {
    customInputContainer.style.display = "none";
  }
});




const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
var keyscount

var key = "loan"
var key1 = 0
var key2 = 0
var key3 = 0
var key4 = 0
var key5 = 0
var keycount =key5 +"" + key4 +""+key3+""+key2+""+key1
var totalpurchase = document.getElementById("totalPurchase")
var totalQty = document.getElementById("totalQty")
var totalpurchaseprice = document.getElementById("totalPurchasePrice")


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
  const starCountRef = ref(database, 'purchasesMC');
  onValue(starCountRef, (snapshot) => {
    document.getElementById("detailsBody1").innerHTML = ""
    totalQty.innerHTML = ""
    totalpurchase.innerHTML = ""
    totalpurchaseprice.innerHTML = ""
    const data = snapshot.val();
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
        
        document.getElementById("detailsBody1").appendChild(row)
        ts = ts + parseInt(data[keyss[i]].purchase_price)
        tq = tq + parseInt(data[keyss[i]].quantity)
        tsp = tsp + parseInt(data[keyss[i]].total_purchase_price)
        
        localStorage.setItem("total_purchase_price", tsp)
        
        totalpurchase.innerHTML = ts
        totalQty.innerHTML = tq
        totalpurchaseprice.innerHTML = tsp
        keyscount = data[keyss[i]].id
    }
}
catch(e){
    console.log(e)
}
    
    
});


async function incrementInStock(company,qty,imei){
    const stockRef = ref(database, "stockMC/"+company.toString());
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
      //   console.log(data.quantity)
      for(var o = 0; o<data.imei.length; o++){
            imeiStock.push(data.imei[o])
      }
      var combinedArray = imeiStock.concat(imei);

      let qtys = data.quantity + qty
      const stockData = {
          company: data.company,
          quantity: qtys,
          imei: combinedArray,
          id: data.company,
      };
    //   set(starCountRef, stockData);
      console.log(stockData)
      },{
          onlyOnce: true,
      });   
    
}
  
  async function addStock(company, qty, totalpurchasepr){
    const stockRef = ref(database, "stockMC/"+company.toString());
    onValue(stockRef, (snapshot) => {
        const data = snapshot.val();
        if(data == null){
            const stockData = {
                company: company,
                quantity: qty,
                imei: totalpurchasepr,
                id: company,
            };
            const stockRef = ref(database, "stockMC/"+company.toString());
            set(stockRef, stockData);          
        }else{
            var imeiStock = []
            for(var o = 0; o<data.imei.length; o++){
                imeiStock.push(data.imei[o])
          }
          var combinedArray = imeiStock.concat(totalpurchasepr);
    
          var qtys = parseInt(data.quantity) + parseInt(qty)
          const stockData = {
              company: data.company,
              quantity: qtys,
              imei: combinedArray,
              id: data.company,
          };
          set(stockRef, stockData);
          console.log(stockData)
          }
         },{
            onlyOnce: true,
         })
    
  }

function addpurchase(){
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
    key = "purchases"
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
    const purchasePr = document.getElementById("purchasePr").value
    const qty = document.getElementById("qty").value
    if(purchasePr == "" || qty == ""){
        alert("Please fill all fields")
        return
    }
    const totalpurchasepr = purchasePr * qty
    const imei = document.getElementById("imei").value
    var IMEI = imei.split('\n')
    console.log(IMEI)
    const phoneNo = document.getElementById("mobNo").value

    const purchasesRef = ref(database, 'purchasesMC/'+keyid);
    const purchaseData = {
        date: date,
        company: company,
        phone: phoneNo,
        quantity: qty,
        purchase_price: purchasePr,
        total_purchase_price: totalpurchasepr,
        imei: IMEI,
        id: keycount,
    };
    set(purchasesRef, purchaseData);
    addStock(company, qty, IMEI)
    // incrementInStock(company,qty,IMEI)
    // window.location.href = "./purchase.html"
    // now remove data of variables to entera gain new data
    document.getElementById("company").value = ''
    document.getElementById("customCompanyInput").value = ''
    document.getElementById("purchasePr").value = ''
    document.getElementById("qty").value = ''
    document.getElementById("imei").value = ''
    document.getElementById("mobNo").value = ''
    // window.location.reload()
    console.log("done")
    
    
}


const addpurchaseBtn = document.getElementById("purchaseBtn")
addpurchaseBtn.addEventListener("click", addpurchase)




const purchaseRef = ref(database, 'purchasesMC');
onValue(purchaseRef, (snapshot) => {
    var checkList = []
    const data = snapshot.val();
    try{var keyss = Object.keys(data)
      for(var i = 0; i < keyss.length; i++){
        if(checkList.includes(data[keyss[i]].company)){
            console.log("already exists")
        }else{
            selectElement.innerHTML += `<option value="${data[keyss[i]].company}">${data[keyss[i]].company}</option>`
            checkList.push(data[keyss[i]].company)
        }
        
        
        console.log(data[keyss[i]].company)
    }
}
catch(e){
    console.log(e)
}
    //  add another option to come in last for other company
    selectElement.innerHTML += `<option value="other">Other</option>`

},{
    onlyOnce: true
})
// handling logic of Stock
