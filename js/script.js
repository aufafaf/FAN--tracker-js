const array = [1, 2, 3, 4, 5];
const transaction = [
  {
    id: 1,
    task: "belajar",
  },
  {
    id: 2,
    task: "html",
  },
  {
    id: 3,
    task: "js",
  },
  {
    id: 4,
    task: "css",
  },
  {
    id: 5,
    task: "ts",
  },
];
result = array.filter((num) => num > 3);
console.log(result);

po = array.map((num) => num * 2);
console.log(po);

blo = transaction.find((num) => num.id === 3);
console.log(blo);

plo = transaction.findIndex((num) => num.id === 3);
console.log(plo);
