// Global variables
let transactions = [];
let myChart = null;

// DOM elements
const form = document.getElementById('transaction-form');
const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const listContainer = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');

// Load transactions from localStorage
function loadTransactions() {
  const saved = localStorage.getItem('transactions');
  transactions = saved ? JSON.parse(saved) : [];
}

// Save transactions to localStorage
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Format rupiah
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

// Calculate balance
function calculateBalance() {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpense;
  
  // Update DOM
  balanceEl.textContent = formatRupiah(balance);
  incomeEl.textContent = formatRupiah(totalIncome);
  expenseEl.textContent = formatRupiah(totalExpense);
  
  return { totalIncome, totalExpense, balance };
}

// Render transactions list
function renderTransactions() {
  if (transactions.length === 0) {
    listContainer.innerHTML = '<p class="empty">Belum ada transaksi</p>';
    return;
  }
  
  listContainer.innerHTML = transactions.map(t => `
    <div class="transaction ${t.type}">
      <div class="transaction-info">
        <h4>${t.name}</h4>
        <span class="type-badge">${t.type === 'income' ? '📈 Income' : '📉 Expense'}</span>
      </div>
      <div class="transaction-actions">
        <span class="amount">${formatRupiah(t.amount)}</span>
        <button class="delete-btn" data-id="${t.id}">🗑️</button>
      </div>
    </div>
  `).join('');
}

// Render chart
function renderChart() {
  const { totalIncome, totalExpense } = calculateBalance();
  
  // Destroy old chart
  if (myChart) {
    myChart.destroy();
  }
  
  // Create new chart
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        data: [totalIncome, totalExpense],
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(244, 67, 54, 0.8)'
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(244, 67, 54, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + formatRupiah(context.parsed);
            }
          }
        }
      }
    }
  });
}

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = document.querySelector('input[name="type"]:checked').value;
  
  // Validation
  if (!name || !amount || amount <= 0) {
    alert('Mohon isi semua field dengan benar!');
    return;
  }
  
  // Create transaction
  const transaction = {
    id: Date.now(),
    name,
    amount,
    type
  };
  
  // Add to array
  transactions.push(transaction);
  
  // Save & render
  saveTransactions();
  renderTransactions();
  calculateBalance();
  renderChart();
  
  // Reset form
  form.reset();
  nameInput.focus();
}

// Delete transaction
function deleteTransaction(id) {
  if (!confirm('Yakin ingin menghapus transaksi ini?')) {
    return;
  }
  
  transactions = transactions.filter(t => t.id !== id);
  
  saveTransactions();
  renderTransactions();
  calculateBalance();
  renderChart();
}

// Event delegation for delete buttons
listContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    deleteTransaction(id);
  }
});

// Form submit
form.addEventListener('submit', addTransaction);

// Init
function init() {
  loadTransactions();
  renderTransactions();
  calculateBalance();
  renderChart();
}

init();

