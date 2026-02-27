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

  renderTransaction();

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

// localStorage.setItem(
//   "transaction",
//   JSON.stringify([
//     { id: 1, name: "Gaji", amount: 5000000, type: "income" },
//     { id: 2, name: "Salary", amount: 100000, type: "income" },
//   ]),
// );

// localStorage.removeItem(transaction);
// localStorage.clear();
init();

console.log(transaction.length);
// console.log(transaction[0].name);
// console.log(transaction[1].name);

function addTransaction(e) {
  e.preventDefault();
  console.log("Form submitted");

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = document.querySelector('input[name="type"]:checked').value;

  console.log(name);
  console.log(amount);
  console.log(type);

  if (name === "" || name === null) {
    alert("Nama transaksi tidak boleh kosong");
    return;
  }

  if (isNaN(amount) || amount < 0) {
    alert("Jumlah harus angka positif");
    return;
  }

  console.log("Validation passed");

  const transaksi = {
    id: Date.now(),
    name: name,
    amount: amount,
    type: type,
  };

  console.log("Transaction: ", transaksi);

  transaction.push(transaksi);
  console.log("All transaction", transaction);

  transactionForm.reset();
  nameInput.focus();

  console.log("Form cleared");

  saveTransaction();
  renderTransaction();

  alert("Transaction berhasil ditambahkan");
}

function saveTransaction() {
  const jsonString = JSON.stringify(transaction);

  localStorage.setItem("transaction", jsonString);
  console.log("Saved to localstorage");
}

transactionForm.addEventListener("submit", addTransaction);

function renderTransaction() {
  console.log("Rendering Transaction");

  transactionList.innerHTML = "";
  console.log("List cleared");

  if (transaction.length === 0) {
    transactionList.innerHTML = `
      <p class='empty'>Belum ada transaksi. Tambahkan transaksi pertama anda </p>
    `;
    console.log("No transaction to display");
    return;
  }

  transaction.forEach(function (transaksi) {
    console.log("Rendering:", transaksi);

    const transactionHTML = `
      <div class="transaction ${transaksi.type}">
        <div class="transaction-info">
          <h4>${transaksi.name}</h4>
          <span class="type-badge">
            ${transaksi.type === "income" ? "📈 Income" : "📉 Expense"}
          </span>
        </div>
        <div class="transaction-actions">
          <span class="amount">Rp ${transaksi.amount}</span>
          <button class="delete-btn" data-id="${transaksi.id}">🗑️</button>
        </div>
      </div>
    `;

    transactionList.innerHTML += transactionHTML;
  });

  console.log("All transactions rendered");
}

// ==========================================
// FUNCTION DELETE TRANSACTION
// ==========================================

function deleteTransaction(id) {
  console.log('Deleting transaction with id:', id);
  
  
  // ==========================================
  // 1. KONFIRMASI DULU (OPTIONAL TAPI BAGUS)
  // ==========================================
  
  const confirmation = confirm('Yakin ingin menghapus transaksi ini?');
  
  if (!confirmation) {
    console.log('Delete cancelled');
    return; // User cancel, stop function
  }
  
  
  // ==========================================
  // 2. FILTER ARRAY (EXCLUDE ID YANG DIHAPUS)
  // ==========================================
  
  // Before filter
  console.log('Before delete:', transactions);
  console.log('Total transactions:', transactions.length);
  
  // Filter: ambil semua KECUALI yang id-nya sama
  transactions = transactions.filter(function(transaction) {
    return transaction.id !== id;
  });
  
  // Atau pakai arrow function (lebih singkat)
  // transactions = transactions.filter(t => t.id !== id);
  
  // After filter
  console.log('After delete:', transactions);
  console.log('Total transactions:', transactions.length);
  
  
  // ==========================================
  // 4. SAVE KE LOCALSTORAGE
  // ==========================================
  
  saveTransactions();
  console.log('Saved to localStorage! 💾');
  
  
  // ==========================================
  // 5. RE-RENDER LIST
  // ==========================================
  
  renderTransactions();
  console.log('List re-rendered! 🔄');
  
  
  // ==========================================
  // 6. UPDATE BALANCE (belum dibuat)
  // ==========================================
  
  // calculateBalance(); // Nanti dibuat
  
  
  // ==========================================
  // 7. UPDATE CHART (belum dibuat)
  // ==========================================
  
  // renderChart(); // Nanti dibuat
  
  
  console.log('Transaction deleted successfully! ✅');
}


// ==========================================
// EVENT DELEGATION UNTUK DELETE BUTTON
// ==========================================

// Pasang event listener di PARENT (list container)
// Bukan di tiap button (karena button dibuat dinamis)

listContainer.addEventListener('click', function(e) {
  console.log('Clicked:', e.target);
  
  // Cek apakah yang diklik adalah delete button
  if (e.target.classList.contains('delete-btn')) {
    console.log('Delete button clicked!');
    
    // Ambil ID dari data-id attribute
    const id = e.target.getAttribute('data-id');
    
    // Convert string ke number
    const idNumber = parseInt(id);
    
    console.log('ID to delete:', idNumber);
    
    // Call delete function
    deleteTransaction(idNumber);
  }
});

console.log('Event delegation attached! 👂');