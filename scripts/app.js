import { saveToLocalStorage, getLocalStoage, removeFromLocalStorage } from './localStorage.js';

const budgetNum = document.getElementById('budgetNum');
const submitBtn = document.getElementById('submitBtn');
const moneyTxt = document.getElementById('money');

const expensePrice = document.getElementById('expensePrice');
const expenseName = document.getElementById('expenseName');
const submitExpenseBtn = document.getElementById('submitExpenseBtn');
const whereExpense = document.getElementById('whereExpense');
const placeHold = document.getElementById('placeHold');
const resetBtn = document.getElementById('resetBtn');

submitBtn.addEventListener('click', function () {
    if (budgetNum.value == '') {
        alert('Please Enter In Your Monthly Budget')
    } else {
        moneyTxt.textContent = 'Your budget is $' + budgetNum.value;
        submitExpenseBtn.classList.remove('hide');
    }
});


submitExpenseBtn.addEventListener('click', function () {
    let letters = /^[A-Za-z-]+$/;
    if (expenseName.value == '' || expensePrice.value == '' || !expenseName.value.match(letters)) {
        alert('Please input something to the input fields or make sure you put letters into the name')
    } else {
        let saveMoney = {
            budget: budgetNum.value,
            expensename: expenseName.value.charAt(0).toUpperCase() + expenseName.value.slice(1),
            expenseprice: expensePrice.value,
            totalbudget: 0
        };
        saveToLocalStorage(saveMoney);
    }
});

resetBtn.addEventListener('click', function () {
    let initialBudget = parseFloat(getLocalStoage()[0].budget);
    placeHold.textContent = `Remaining budget: $${initialBudget}`;
    localStorage.clear();
    whereExpense.innerHTML = '';
    CreateExpense()
});

function CreateExpense() {
    whereExpense.innerHTML = '';
    let moneys = getLocalStoage();

    moneys.forEach(money => {
        moneyTxt.textContent = 'Your budget is $' + money.budget;
        budgetNum.value = money.budget;
        money.totalbudget = (money.budget - money.expenseprice);

        let row = document.createElement('row');

        let h4 = document.createElement('h4');
        h4.className = 'expenseDisplay';
        h4.id = 'expenseNameAndPrice';
        h4.textContent = `Expense: ${money.expensename} \n Price: $${money.expenseprice}`;

        let hr = document.createElement('hr');

        row.appendChild(h4);
        row.appendChild(hr);
        whereExpense.append(row);
    })
}
CreateExpense()

export { CreateExpense }