import { saveToLocalStorage, getLocalStoage, removeFromLocalStorage, CreateExpense } from './localStorage.js';

const budgetNum = document.getElementById('budgetNum');
const submitBtn = document.getElementById('submitBtn');
const money = document.getElementById('money');

const expensePrice = document.getElementById('expensePrice');
const expenseName = document.getElementById('expenseName');
const submitExpenseBtn = document.getElementById('submitExpenseBtn');
const whereExpense = document.getElementById('whereExpense');


submitBtn.addEventListener('click', function() {
    money.textContent = 'Your budget is $'+budgetNum.value;
});

submitExpenseBtn.addEventListener('click', function() {
    let saveMoney = {
        budget: budgetNum.value,
        expensename: expenseName.value,
        expenseprice: expensePrice.value
    };
    saveToLocalStorage(saveMoney);
});