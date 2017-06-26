import React, { Component } from 'react'

class NotLoggedIn extends Component {

  constructor() {
    super()
    this.state = {
      usernameInput: '',
      passwordInput: '',
      feedback: '',
      signUp: false
    }
  }

  handleUsernameInput(e) {
    this.setState({usernameInput: e.target.value})
  }

  handlePasswordInput(e) {
    this.setState({passwordInput: e.target.value})
  }

  handleSubmit() {
    const { app } = this.props

    const {
      signUp,
      usernameInput,
      passwordInput
    } = this.state

    if(signUp) {
      app.signUp(usernameInput, passwordInput)
      this.setState({feeback: 'Account created'})
    } else {
      app.logIn(usernameInput, passwordInput)
    }

  }

  toggleLogin() {
    this.setState({signUp: !this.state.signUp})
  }

  render() {
    console.log('in not logged', this.props.app.isLoggedIn())
    return (
      <div>
        <h2>{this.state.signUp ? 'Sign Up' : 'Login'}</h2>
        <input
          label='Username'
          onChange={this.handleUsernameInput.bind(this)}
          value={this.state.usernameInput}
        />
        <input
          label='Password'
          onChange={this.handlePasswordInput.bind(this)}
          value={this.state.passwordInput}
        />
        <button
          onClick={() => this.handleSubmit()}
        >
          Submit
        </button>
        <button
          onClick={() => this.toggleLogin()}
        >
          {this.state.signUp ? 'Login' : 'Sign Up'}
        </button>
        {this.state.feedback && <h4>{this.state.feedback}</h4>}
      </div>
    )
  }
}

export default NotLoggedIn
