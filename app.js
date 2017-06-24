const account = require('./account')

const app = () => {
  return new function() {
    let accounts = {}
    let activeAccount = null

    this.signUp = (accountName, password) => {
      accounts[accountName] = account(accountName, password)
      activeAccount = accounts[accountName]
    }

    this.logIn = (accountName, password) => {
      if(!accounts[accountName] || accounts[accountName].password != password) {
        return false
      } else {
        activeAccount = accounts[accountName]
        return true
      }
    }

    this.logOut = () => {
      activeAccount = null
    }

    this.isLoggedIn = () => {
      if(!activeAccount) {
        return false
      } else {
        return true
      }
    }
      
    this.recordDeposit = (deposit) => {
      activeAccount.ledger.recordDeposit(deposit)
    }

    this.recordWithdrawal = (withdrawal) => {
      activeAccount.ledger.recordWithdrawal(withdrawal)
    }

    this.getBalance = () => activeAccount.ledger.getBalance()

    this.getTransactions = () => activeAccount.ledger.getTransactions()

  }
}

module.exports = app
