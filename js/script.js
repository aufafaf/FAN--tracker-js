// form dan input element
const transactionForm = document.getElementById("transaction-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");

// display element
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

// container untuk list transaksi
const transactionList = document.getElementById("transaction-list");

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
console.log("Name:", nameInput);
console.log("Amount:", amountInput);
console.log("Balance:", balance);
console.log("list transaction:", transactionList);

localStorage.setItem(
  "transaction",
  JSON.stringify([
    { id: 1, name: "Gaji", amount: 5000000, type: "income" },
    { id: 2, name: "Salary", amount: 100000, type: "income" },
  ]),
);

// localStorage.removeItem(transaction);
// localStorage.clear();
init();

console.log(transaction.length);
console.log(transaction[0].name);
console.log(transaction[1].name);

function addTransaction(e) {
  e.preventDefault();
  console.log("Form submitted");

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = document.querySelector('input[name="type"]:checked').value;

  console.log(name);
  console.log(amount);
  console.log(type);
}

transactionForm.addEventListener("submit", addTransaction);
