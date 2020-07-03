class Budget {
  constructor(budget, expenses, balance) {
    this.budget = budget;
    this.expenses = expenses;
    this.balance = balance;
    this.currency = '$';
  }

  getBudget() {
    return `${this.currency}${this.convertTo(this.budget)}`;
  }
  setBudget(budget) {
    this.budget = budget;
  }
  getExpenses() {
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
}
