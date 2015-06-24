function ATM(initialAmounts){
  initialAmounts = initialAmounts || {}; //ensure defined...
  this.checking = initialAmounts.checking || 0;
  this.checking = parseInt(this.checking); //ensure it's an int
  this.savings  = initialAmounts.savings || 0;
  this.savings  = parseInt(this.savings);

  this.withdraw = function(account, amount) {
    if (this._isBadInput(account, amount)) return false;
    amount = parseInt(amount);
    if (this[account] >= amount) {
      this[account] -= amount;
    } else {
      if (this.savings + this.checking >= amount) {
        amount -= this[account];
        this[account] = 0;
        otherAccount = (account === "savings") ?
          "checking" : "savings";
        this[otherAccount] -= amount;  
      }
    }
    return true;
  }

  this.deposit = function(account, amount) {
    amount = parseInt(amount);
    if (this._isBadInput(account, amount)) return false;
    this[account] += amount;
    return true;
  }

  this._isBadInput = function(account, amount) {
    if ( isNaN(amount) ||
         (amount < 0)  ||
         (account !== "savings" && account !== "checking") ) {
      return true;
    } else {
      return false;
    }
  }
}