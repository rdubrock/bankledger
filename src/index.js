import React from 'react'
import ReactDOM from 'react-dom'
import app from '../app'
import LoggedIn from './LoggedIn'
import NotLoggedIn from './NotLoggedIn'

const initializedApp = app()

const BankLedger = ({
  app,
  isLoggedIn
}) => {
  console.log('index', isLoggedIn)
  if(isLoggedIn) {
    return (
      <LoggedIn
        app={app}
      /> 
    )
  } else {
    return (
      <NotLoggedIn
        app={app}
      />
    )
  }
}

ReactDOM.render(
  <BankLedger 
    isLoggedIn={initializedApp.isLoggedIn()}
    app={initializedApp}
  />,
  document.getElementById('root')
);
