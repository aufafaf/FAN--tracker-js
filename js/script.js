// form dan input element
const transactionForm = document.getElementById("transaction-form");
const name = document.getElementById("name");
const amount = document.getElementById("amount");

// display element
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

// container untuk list transaksi
const container = document.getElementById("transaction-list");

// canvas untuk chart
const canvas = document.getElementById("canvas");

let transaction = [];

function init() {
  console.log("App initialized");

  loadTransaction();

  console.log("Loaded transaction:", transaction);
}

function loadTransaction() {
  const saved = localStorage.getItem("transaction");

  if (saved) {
    transaction = JSON.parse(saved);
    console.log("Data found:", transaction);
  } else {
    transaction = [];
    console.log("No data found, using empty array");
  }
}

console.log("Form element:", transactionForm);
console.log("Name:", name);
console.log("Amount:", amount);
console.log("Balance:", balance);
console.log("list transaction:", container);

localStorage.setItem(
  "transaction",
  JSON.stringify([{ id: 1, name: "Gaji", amount: 5000000, type: "income" }]),
);

// localStorage.removeItem(transaction);
// localStorage.clear();
init();

console.log(transaction.length);
console.log(transaction[0].name);
