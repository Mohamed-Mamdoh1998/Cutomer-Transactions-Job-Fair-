const searchInput = document.getElementById("searchInput");
const transactionTable = document.getElementById("transactionTable");

let http = new XMLHttpRequest();
http.open("get", "/js/customerTransaction.json", true);
http.send();
let transactions = [];
let customers = [];
http.addEventListener("load", function (c,t) {
  // let customers = customer_transactions.customers;
  // let transactions = customer_transactions.transactions;

  transactions = JSON.parse(http.response).transactions;
  customers = JSON.parse(http.response).customers;
  let customers_transactions =
   allcustomersData = customers.concat(transactions) ;
  console.log(customers);
  console.log(transactions);
  // displayTable();
});

// function displayTable(arr) {
//   var displayTable = ``;
//   for (var i = 0; i < customers.length; i++) {
//     // get customer transactions
 
//     for (var t = 0; t < transactions.length; t++) {
        
//       // console.log(transactions[i].id , customers[i].id);
//       // console.log(transactions[i].amount , customers[i].name);
//       displayTable += `
//               <tr>
//                   <td class="user-name">${customers[i].name}</td>
//                   <td>${transactions[t].amount}</td>
//                   <td><button class="btn btn-primary">View Chart</button></td>
                
//               </tr>
//           `;

//       // creating the HTML for each row

//       // }
//     }
//   }
//   transactionTable.innerHTML = displayTable;
// }



http.addEventListener("error", function () {
  console.log("error");
});
