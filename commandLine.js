const inquirer = require('inquirer')
const bankApp = require('./app')

const app = bankApp()

const promptNameAndPass = () => {

  const questions = [
    {
      type: 'input',
      name: 'accountName',
      message: 'Enter an account name'
    },
    {
      type: 'input',
      name: 'password',
      message: 'Enter a password'
    }
  ]

  return inquirer.prompt(questions).then((answers) => {
    if(!answers.accountName || !answers.password) {
      console.log('Invalid Entry')
      homeActions()
    } else {
      return answers
    }
  })
}

const signUp = () => {
  promptNameAndPass()
  .then((answers) => {
    app.signUp(answers.accountName, answers.password)
    homeActions()
  })
}

const logIn = (accountName, password) => {
  promptNameAndPass()
  .then((answers) => {
    let login = app.logIn(answers.accountName, answers.password)
    if(login) {
      console.log('Login successful')
    } else {
      console.log('Login unsuccessful')
    }
    homeActions()
  })
}

const signOut = () => {
  app.logOut()
  homeActions()
}

const checkBalance = () => {
  if(checkLogin()) {
    console.log(`Balance is ${app.getBalance()}`)
  }
  homeActions()
}

const promptAmount = () => {
  const questions = [
    {
      type: 'input',
      name: 'amount',
      message: 'Enter amount'
    }
  ]
  return inquirer.prompt(questions)
}

const makeDeposit = () => {
  if(checkLogin()) {
    promptAmount()
    .then((answer) => {
        let parsedAmount = validateNumber(answer.amount)
        if(parsedAmount) {
          app.recordDeposit(parsedAmount)
        }
        homeActions()
    })
  } else {
    homeActions()
  }
}

const withdraw = () => {
  if(checkLogin()) {
    promptAmount()
    .then((answer) => {
        let parsedAmount = validateNumber(answer.amount)
        if(parsedAmount) {
          app.recordWithdrawal(parsedAmount)
        }
      homeActions()
    })
  } else {
    homeActions()
  }
}

const transactions = () => {
  if(checkLogin()) {
    let transactionsList = app.getTransactions()
    transactionsList.forEach((transaction) => {
      console.log(transaction)
    })
  }
  homeActions()
}

const validateNumber = (number) => {
  let float = parseFloat(number)
  if(isNaN(float)) {
    console.log('Invalid amount')
  } else {
    return float
  }
}

const checkLogin = () => {
  if(!app.isLoggedIn()) {
    console.log('Not logged in')
    return false
  } else {
    return true
  }
}

const homeActions = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        'Sign up',
        'Log in',
        'Sign Out',
        'Check Balance',
        'Make Deposit',
        'Withdraw',
        'Get Transactions',
        'Exit'
      ]
    }
  ])
  .then((answers) => {
    switch(answers.action) {
      case 'Sign up':
        signUp()
        break
      case 'Log in':
        logIn()
        break
      case 'Sign Out':
        signOut()
        break
      case 'Check Balance':
        checkBalance()
        break
      case 'Make Deposit':
        makeDeposit()
        break
      case 'Withdraw':
        withdraw()
        break
      case 'Get Transactions':
        transactions()
        break
      case 'Exit':
        break
    }
  })
}

homeActions()
