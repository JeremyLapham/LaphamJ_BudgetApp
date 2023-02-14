import { CreateExpense } from "./app.js";

const placeHold = document.getElementById('placeHold');

function saveToLocalStorage(amount) {
    let sameExpense = false;
    let money = getLocalStoage();

    for (let i = 0; i < money.length; i++) {
        if (money[i].budget == amount.budget &&
            money[i].expensename == amount.expensename &&
            money[i].expenseprice == amount.expenseprice) {
            sameExpense = true;
        }
    }
    if (sameExpense) {
        alert('Hey hey hey are you really doing the same expense twice in a month')
    } else {
        money.push(amount);
        let total = 0;
        for (let i = 0; i < money.length; i++) {
            total += Number(money[i].expenseprice);
        }
        amount.totalbudget = amount.budget - total;
        if(amount.totalbudget < 0) {
            alert('Woahhhh you need to budget better there my dude')
        } else {
            placeHold.textContent = `Remaining budget: $${Number(amount.totalbudget)}`;
            
            localStorage.setItem('Money', JSON.stringify(money));
            CreateExpense()
        }
    }
}

function getLocalStoage() {
    let localStorageData = localStorage.getItem('Money');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(amount) {
    let money = getLocalStoage();
    let moneyIndex = 0;

    for (let i = 0; i < money.length; i++) {
        if (money[i].budget == amount.budget &&
            money[i].expensename == amount.expensename &&
            money[i].expenseprice == amount.expenseprice &&
            money[i].totalbudget == amount.totalbudget) {
            moneyIndex = i;
        }
    }

    money.splice(moneyIndex, 1);
    localStorage.setItem('Money', JSON.stringify(money));
}

export { saveToLocalStorage, getLocalStoage, removeFromLocalStorage }