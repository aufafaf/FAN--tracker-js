// .push() - tambah item ke array
const transactions = [];
transactions.push({ id: 1, name: 'Gaji', amount: 5000000 });

// .filter() - filter array
const incomes = transactions.filter(t => t.type === 'income');
const expenses = transactions.filter(t => t.type === 'expense');

// .map() - transform array
const amounts = transactions.map(t => t.amount);
// Result: [5000000, 50000, 100000]

// .reduce() - hitung total
const total = transactions.reduce((sum, t) => sum + t.amount, 0);
// Result: 5150000

// Contoh real - hitung total income
const totalIncome = transactions
  .filter(t => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0);

// .find() - cari 1 item
const transaction = transactions.find(t => t.id === 5);

// .findIndex() - cari index
const index = transactions.findIndex(t => t.id === 5);

// Object ke String (untuk simpan)
const transactions = [
  { id: 1, name: 'Gaji', amount: 5000000 }
];
const jsonString = JSON.stringify(transactions);
// Result: '[{"id":1,"name":"Gaji","amount":5000000}]'

// String ke Object (untuk load)
const loadedData = JSON.parse(jsonString);
// Result: array of objects

// Contoh real
localStorage.setItem('transactions', JSON.stringify(transactions));
const saved = JSON.parse(localStorage.getItem('transactions'));