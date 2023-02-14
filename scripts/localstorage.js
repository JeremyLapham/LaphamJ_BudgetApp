function saveToLocalStorage(amount) {
    let sameExpense = false;
    let money = getLocalStoage();

    for(let i = 0; i<money.length; i++){
        if(money[i].budget==amount.budget&&
            money[i].expensename==amount.expensename&&
            money[i].expenseprice==amount.expenseprice) {
                sameExpense = true;
            }
    }
    if(sameExpense) {
        alert('Hey hey hey are you really doing the same espense twice in a month')
    } else {
        money.push(amount);
        localStorage.setItem('Money', JSON.stringify(money));
        CreateExpense()
    }
}

function CreateExpense() {
    let row = document.createElement('row');
    let h4 = document.createElement('h4');
    h4.className = 'expenseDisplay';
    h4.id = 'expenseNameAndPrice';
    h4.textContent = `Expense: ${expenseName.value} \n Price: $${expensePrice.value}`;

    row.appendChild(h4);
    whereExpense.appendChild(row);
}

function getLocalStoage() {
    let localStorageData = localStorage.getItem('Money');

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(amount) {
    let money = getLocalStoage();
    let moneyIndex = money.indexOf(amount);

    money.splice(moneyIndex,1);
    localStorage.setItem('Money', JSON.stringify(money));
}

export { saveToLocalStorage, getLocalStoage, removeFromLocalStorage, CreateExpense }