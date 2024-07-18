"use strict"
let main =document.querySelector("#transactionTable");
// let graph =document.querySelector("#transactionChart");

let result;
async function getdata(){
    let data = await fetch("/js/customerTransaction.json");
    data = await data.json();
    function getCustomersAndTransactions(data) {
        return {
          customers: data.customers,
          transactions: data.transactions
        };
      }
      
       result = getCustomersAndTransactions(data);
      
      console.log(result.customers);
      console.log(result.transactions);
    
     displayData(result.customers,result.transactions);
    //  displayChart(result.customers,result.transactions);
}
getdata();

let obj =[];
let usersData='';
let userTotals = [];
function displayData(x,y){


 // Object to store totals and names


// Initialize the userTotals with users' data
x.forEach(user => {
  userTotals[user.id] = { 
    name: user.name,
     totalAmount: 0 ,
    details:[],
    };
  
});
console.log('user total',userTotals);
// Loop through transactions to calculate total amounts
y.forEach(transaction => {
  const { customer_id, amount, date } = transaction;
  if (userTotals[customer_id]) {
    userTotals[customer_id].totalAmount += amount; // Add the transaction amount to the user's total
    userTotals[customer_id].details.push({date, amount}); // Add the transaction details to the details array for later use or charting
  }
});
data(userTotals);

}
function data(arr){
  // Output the totals
  usersData = '';
for (const customer_id in arr) {
  const { name, totalAmount } = arr[customer_id];
  console.log(`User: ${name}, Total Amount: ${totalAmount}`);
  usersData +=`    
  <tr>
  <td>${name}</td>
  <td>${totalAmount}</td>
  <td><button onclick="userChart(${customer_id})">View</button></td>
  <tr> 
  `;
  // console.log(userTotals)
}

  main.innerHTML = usersData

}
let dataPoints=[];
function userChart(index){
  dataPoints=[];
  console.log(userTotals[index])
  addData(userTotals[index].details)
}
function addData(data) {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Daily Customer Transactions Data"
    },
    axisX: {
      title: "Date",
      interval: 1,
      intervalType: "day",
      valueFormatString: "YYYY-MM-DD" // Format for the x-axis labels
    },
    axisY: {
      title: "Amount",
      includeZero: true
    },
    data: [{
      type: "column",
      yValueFormatString: "#,### Units",
      dataPoints: dataPoints
    }]
  });
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].date)
    dataPoints.push({
      x: new Date(data[i].date),
      y: data[i].amount
    });
  }
  console.log(dataPoints)
  chart.render();
  // console.log(chart.options)
 
}

function searchByName(term){
  let searchedTerms = [];
 
  for(var i=1;i<userTotals.length;i++){
    if(userTotals[i].name.toLowerCase().includes(term.toLowerCase())){
      searchedTerms.push(userTotals[i]);
  }
  
    
  }

  data(searchedTerms)
  console.log(userTotals.length);

}
