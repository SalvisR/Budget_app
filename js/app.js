const checkboxes = document.querySelectorAll('.checkbox');
const currency = document.getElementById('currency');
const front = document.querySelector('.front');
const back = document.querySelector('.back');
const amount = document.querySelectorAll('.amount');
const budgetAmount = document.querySelector('.budget-amount');
const expensesAmount = document.querySelector('.expenses-amount');
const balanceAmount = document.querySelector('.balance-amount');
const addBudget = document.getElementById('add-budget');
const budgetInput = document.getElementById('budget-input');
const addExpense = document.getElementById('add-expense');
const expenseTitle = document.getElementById('expense-title-input');
const expenseAmount = document.getElementById('expense-amount-input');
const tableBody = document.getElementById('table-body');
const deleteBtn = document.getElementById('delete');

let currencyIcon = true;

const budget = new Budget(0, 0, 0);

const setValues = () => {
  budgetAmount.textContent = budget.getBudget();
  expensesAmount.textContent = budget.getExpenses();
  balanceAmount.textContent = budget.getBalance();

  if (budget.getBalance().split('').slice(1).join('') * 1 < 0) {
    balanceAmount.style.color = 'rgb(94, 43, 43)';
  } else {
    balanceAmount.style.color = '#555555';
  }
};

const changeCurrency = (direction, duration) => {
  const frontDirection = [
    'perspective(600px) rotateY(0deg)', 'perspective(600px) rotateY(180deg)'
  ];
  const backDirection = [
    'perspective(600px) rotateY(180deg)', 'perspective(600px) rotateY(360deg)'
  ];

  front.animate([
    { transform: direction ? frontDirection[1] : frontDirection[0] },
    { transform: direction ? frontDirection[0] : frontDirection[1] }
  ], {
    duration,
    fill: 'forwards'
  });
  back.animate([
    { transform: direction ? backDirection[1] : backDirection[0] },
    { transform: direction ? backDirection[0] : backDirection[1] }
  ], {
    duration,
    fill: 'forwards'
  });
};
const changeAmount = (duration = 1000) => {
  amount.forEach(el => {
    const size = getComputedStyle(el).fontSize;

    el.animate([
      { fontSize: `${size}` },
      { fontSize: '0px' },
      { fontSize: '0px' },
      { fontSize: `${size}` }
    ], {
      duration,
      fill: 'forwards'
    });
  });
  setTimeout(() => {
    setValues();
  }, duration / 2);

}
changeAmount(100);


currency.addEventListener('click', () => {
  currencyIcon = !currencyIcon;
  budget.setCurrency(currencyIcon ? 'dollar' : 'euro');

  changeCurrency(currencyIcon, 300);
  changeAmount(500);
  reloadTable();
});

addBudget.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = budgetInput.value;
  if (!isNaN(val)) {
    budget.setBudget(val * 1);
    changeAmount(500);

    budgetInput.value = '';
  }

});

const addToTable = (data) => {
  const tr = document.createElement('tr');
  const checkbox = document.createElement('td');
  const checkBoxInput = document.createElement('input');
  const title = document.createElement('td');
  const amount = document.createElement('td');
  const date = document.createElement('td');

  checkBoxInput.setAttribute('type', 'checkbox');
  checkBoxInput.setAttribute('value', data.id);
  checkbox.appendChild(checkBoxInput);

  title.textContent = data.title;

  const currency = !currencyIcon ? data.amount * 0.89 : data.amount;
  amount.textContent = `${budget.currency}${currency}`;

  date.textContent = moment(data.createdAt).format("MMM Do YY");

  tr.appendChild(checkbox);
  tr.appendChild(title);
  tr.appendChild(amount);
  tr.appendChild(date);

  tableBody.appendChild(tr);
};

const reloadTable = () => {
  const tr = document.querySelectorAll('#table-body tr');

  tr.forEach(row => {
    row.remove();
  });

  const list = budget.expensesList.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });
  list.forEach(expense => {
    addToTable(expense);
  });
};

addExpense.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = expenseTitle.value;
  const amount = expenseAmount.value;
  const data = {
    title,
    amount
  }
  budget.addExpenses(data);

  reloadTable();

  expenseTitle.value = '';
  expenseAmount.value = '';
  changeAmount(500);
});

deleteBtn.addEventListener('click', () => {
  const checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
  checkedCheckboxes.forEach(checkbox => {
    budget.removeExpense(checkbox.value);
  });

  reloadTable();
  changeAmount(500);
});
