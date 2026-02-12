const child = document.getElementById("apala")

child.addEventListener('clik', (e) => {
    if(e.target.classlist.contains('jos')) {
        const id = parseInt(e.target.dataset.id)
        deleteTransaction(id)
    }
})