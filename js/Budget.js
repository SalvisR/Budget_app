class Budget {
  constructor(budget, expenses, balance) {
    this.budget = budget;
    this.expenses = expenses;
    this.balance = balance;
    this.currency = '$';
    this.expensesList = [];
  }

  getBudget() {
    return `${this.currency}${this.convertTo(this.budget)}`;
  }

  setBudget(budget) {
    this.budget = budget;
  }

  getExpenses() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const expenses = this.expensesList.map(expense => expense.amount * 1);

    if (expenses.length > 0) {
      this.expenses = expenses.reduce(reducer);
    } else {
      this.expenses = 0;
    }

    return `${this.currency}${this.convertTo(this.expenses)}`;
  }

  getBalance() {
    return `${this.currency}${this.convertTo(this.budget - this.expenses)}`;
  }

  setCurrency(currency = 'dollar') {
    if (currency === 'euro') {
      return this.currency = '€';
    } else if (currency === 'dollar') {
      return this.currency = '$';
    } else {
      return this.currency = '$';
    }
  }

  getCurrency() {
    return this.currency;
  }

  convertTo(val) {
    if (this.currency == '€') {
      val = val * 0.89;
      return val.toFixed(2).replace(/\.00$/, '');
    } else {
      return val.toFixed(2).replace(/\.00$/, '');
    }
  }

  addExpenses(data) {
    data.id = '_' + Math.random().toString(36).substr(2, 9);
    data.createdAt = Date.now();
    this.expensesList.push(data);

    this.getExpenses();
  }

  removeExpense(id) {
    const index = this.expensesList.findIndex(e => e.id === id);
    this.expensesList.splice(index, 1);
  }
}
