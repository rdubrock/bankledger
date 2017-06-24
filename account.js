const bankLedger = require('./bankLedger')

const account = (accountName, password) => {
  return new function() {
    this.ledger = bankLedger()
    this.accountName = accountName
    this.password = password
  }
}

module.exports = account
