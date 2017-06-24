const bankLedger = () => { 
  return new function() {
    let balance = 0
    let transactions = []

    this.recordDeposit = (deposit) => {
      balance += deposit
      transactions.push(`Deposited ${deposit}`)
    }

    this.recordWithdrawal = (withdrawal) => {
      balance -= withdrawal
      transactions.push(`Withdrew ${withdrawal}`)
    }

    this.getBalance = () => { 
      return balance
    }

    this.getTransactions = () => {
      return transactions
    }
  }
}

module.exports = bankLedger
