import { saveToLocalStorage, getLocalStoage, removeFromLocalStorage } from './localStorage.js';

const budgetNum = document.getElementById('budgetNum');
const submitBtn = document.getElementById('submitBtn');
const moneyTxt = document.getElementById('money');

const expensePrice = document.getElementById('expensePrice');
const expenseName = document.getElementById('expenseName');
const submitExpenseBtn = document.getElementById('submitExpenseBtn');
const whereExpense = document.getElementById('whereExpense');
const placeHold = document.getElementById('placeHold');

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
    if (expenseName.value == '' || expensePrice.value == ''|| !expenseName.value.match(letters)) {
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

function CreateExpense() {
    whereExpense.innerHTML = '';

    let moneys = getLocalStoage();

    moneys.forEach(money => {
        moneyTxt.textContent = 'Your budget is $' + money.budget;
        money.totalbudget = (money.budget - money.expenseprice);

        let row = document.createElement('row');

        let h4 = document.createElement('h4');
        h4.className = 'expenseDisplay';
        h4.id = 'expenseNameAndPrice';
        h4.textContent = `Expense: ${money.expensename} \n Price: $${money.expenseprice}`;

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'button';
        deleteBtn.classList.add('expenseDisplay');
        deleteBtn.addEventListener('click', function () {
            let deletedValue = money.expenseprice; // Get the value of the deleted card
            deleteBtn.parentNode.remove(); // Remove the row element that contains the button and h4
            removeFromLocalStorage(money); // Remove the corresponding data from local storage
        
            let moneys = getLocalStoage();
            let remainingBudget = moneys.reduce((acc, money) => acc + money.budget - money.expenseprice, 0);
            remainingBudget += Number(deletedValue); // Add the value of the deleted card to the current remaining budget
            placeHold.textContent = `Remaining budget: $${remainingBudget + money.totalbudget}`; // Update the remaining budget display
        });

        row.appendChild(h4);
        row.appendChild(deleteBtn);
        whereExpense.append(row);
    })
}
CreateExpense()

export { CreateExpense }