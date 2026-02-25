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

  alert("Transaction berhasil ditambahkan");
}

function saveTransaction() {
  const jsonString = JSON.stringify(transaction);

  localStorage.setItem("transaction", jsonString);
  console.log("Saved to localstorage");
}

transactionForm.addEventListener("submit", addTransaction);

// ==========================================
// FUNCTION RENDER TRANSACTIONS
// ==========================================

function renderTransactions() {
  console.log('Rendering transactions...');
  
  // ==========================================
  // 2. CLEAR LIST HTML DULU
  // ==========================================
  
  listContainer.innerHTML = '';
  console.log('List cleared!');
  
  
  // ==========================================
  // CEK APAKAH ADA DATA
  // ==========================================
  
  if (transactions.length === 0) {
    listContainer.innerHTML = `
      <p class="empty">Belum ada transaksi. Tambahkan transaksi pertama Anda!</p>
    `;
    console.log('No transactions to display');
    return; // Stop function
  }
  
  
  // ==========================================
  // 3. LOOP ARRAY TRANSACTIONS
  // ==========================================
  
  transactions.forEach(function(transaction) {
    console.log('Rendering:', transaction);
    
    
    // ==========================================
    // 4. BUAT HTML ELEMENT
    // ==========================================
    
    const transactionHTML = `
      <div class="transaction ${transaction.type}">
        <div class="transaction-info">
          <h4>${transaction.name}</h4>
          <span class="type-badge">
            ${transaction.type === 'income' ? '📈 Income' : '📉 Expense'}
          </span>
        </div>
        <div class="transaction-actions">
          <span class="amount">Rp ${transaction.amount.toLocaleString('id-ID')}</span>
          <button class="delete-btn" data-id="${transaction.id}">🗑️</button>
        </div>
      </div>
    `;
    
    
    // ==========================================
    // 7. APPEND KE LIST CONTAINER
    // ==========================================
    
    listContainer.innerHTML += transactionHTML;
  });
  
  console.log('All transactions rendered! ✅');
}


// ==========================================
// UPDATE FUNCTION addTransaction
// ==========================================

function addTransaction(e) {
  e.preventDefault();
  
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = document.querySelector('input[name="type"]:checked').value;
  
  if (!name) {
    alert('Nama transaksi tidak boleh kosong!');
    return;
  }
  
  if (isNaN(amount) || amount <= 0) {
    alert('Jumlah harus angka positif!');
    return;
  }
  
  const transaction = {
    id: Date.now(),
    name,
    amount,
    type
  };
  
  transactions.push(transaction);
  saveTransactions();
  
  form.reset();
  nameInput.focus();
  
  // ==========================================
  // CALL RENDER (SEKARANG UDAH ADA)
  // ==========================================
  
  renderTransactions(); // ✅ Tampilkan list
  // calculateBalance(); // Belum dibuat
  // renderChart(); // Belum dibuat
  
  console.log('Transaction added!');
}


// ==========================================
// UPDATE FUNCTION init
// ==========================================

function init() {
  console.log('App initialized!');
  
  loadTransactions();
  
  // ==========================================
  // CALL RENDER SAAT PAGE LOAD
  // ==========================================
  
  renderTransactions(); // ✅ Tampilkan list yang udah disimpan
  
  console.log('Loaded transactions:', transactions);
}

// ==========================================
// RENDER TRANSACTIONS (Versi Map)
// ==========================================

function renderTransactions() {
  // Clear
  listContainer.innerHTML = '';
  
  // Cek kosong
  if (transactions.length === 0) {
    listContainer.innerHTML = `
      <p class="empty">Belum ada transaksi. Tambahkan transaksi pertama Anda!</p>
    `;
    return;
  }
  
  // Map array jadi HTML, join jadi 1 string
  const html = transactions.map(t => `
    <div class="transaction ${t.type}">
      <div class="transaction-info">
        <h4>${t.name}</h4>
        <span class="type-badge">
          ${t.type === 'income' ? '📈 Income' : '📉 Expense'}
        </span>
      </div>
      <div class="transaction-actions">
        <span class="amount">${formatRupiah(t.amount)}</span>
        <button class="delete-btn" data-id="${t.id}">🗑️</button>
      </div>
    </div>
  `).join('');
  
  // Set HTML
  listContainer.innerHTML = html;
  
  console.log('Rendered', transactions.length, 'transactions');
}

// Helper function format rupiah
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}