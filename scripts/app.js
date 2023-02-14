import { saveToLocalStorage, getLocalStoage, removeFromLocalStorage } from './localStorage.js';

const budgetNum = document.getElementById('budgetNum');
const submitBtn = document.getElementById('submitBtn');
const money = document.getElementById('money');

const expensePrice = document.getElementById('expensePrice');
const expenseName = document.getElementById('expenseName');
const submitExpenseBtn = document.getElementById('submitExpenseBtn');
const whereExpense = document.getElementById('whereExpense');

const placeHold = document.getElementById('placeHold');


submitBtn.addEventListener('click', function () {
    if (budgetNum.value == '') {
        alert('Please Enter In Your Monthly Budget')
    } else {
        money.textContent = 'Your budget is $' + budgetNum.value;
        submitExpenseBtn.classList.remove('hide');
    }
});

submitExpenseBtn.addEventListener('click', function () {
    let saveMoney = {
        budget: budgetNum.value,
        expensename: expenseName.value.charAt(0).toUpperCase() + expenseName.value.slice(1),
        expenseprice: expensePrice.value,
        totalbudget: 0
    };
    saveMoney.totalbudget = (saveMoney.budget - saveMoney.expenseprice);
    saveToLocalStorage(saveMoney);
});

function CreateExpense() {
    whereExpense.innerHTML = '';

    let moneys = getLocalStoage();

    moneys.forEach(money => {
        money.totalbudget = (money.budget - money.expenseprice);
        placeHold.textContent = money.totalbudget;

        let row = document.createElement('row');

        let h4 = document.createElement('h4');
        h4.className = 'expenseDisplay';
        h4.id = 'expenseNameAndPrice';
        h4.textContent = `Expense: ${money.expensename} \n Price: $${money.expenseprice}`;

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'button';
        deleteBtn.addEventListener('click', function () {
            deleteBtn.remove();
            h4.remove();
            money.totalbudget += Number(money.expenseprice);
            placeHold.textContent = money.totalbudget;
            removeFromLocalStorage(money);
        });

        row.appendChild(h4);
        row.appendChild(deleteBtn);
        whereExpense.append(row);
    })
}
CreateExpense()


export { CreateExpense }