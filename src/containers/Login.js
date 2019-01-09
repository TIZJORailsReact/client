import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../api';
import { connect } from 'react-redux'
import { setToken, setUrl, } from '../actions/user'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect:false,
      dashboard:false,
      error:''
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    const { name, email, password } = this.state;
    const { setToken, setUrl } = this.props;
    const params={
      auth:{
        name:name,
        email:email,
        password:password
      }
    }
    api.signIn(params)
      .then( res => {
        setToken(res.data)
        this.setState({ dashboard: true })
      })
      .catch(err => this.setState({ error: 'Błędny login'}))
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, password, redirect, dashboard } = this.state;
    if(redirect){
      return(
        <Redirect to ="/register" />
      )
    }
    if(dashboard){
      return(
        <Redirect to ="/dashboard" />
      )
    }
    return (
      <div className="uk-flex uk-flex-column uk-flex-wrap">
        <h1>MicroMovies App</h1>
        <form
          className="uk-panel uk-panel-box uk-form uk-flex uk-flex-column uk-flex-wrap"
          onSubmit={this.onSubmit}
        >
          <h1 className="text--orange uk-text-center">Login</h1>
          <hr />
          <span className="uk-display-inline-block uk-width-1-1 uk-text-center">{this.state.error}</span>
          <div className="uk-container">
            <div className="uk-flex uk-flex-center uk-flex-wrap uk-flex-column">
              <div className="uk-inline uk-margin-bottom uk-margin-top">
                <input
                  className="uk-input"
                  name="email"
                  type="text"
                  value={email}
                  required={true}
                  onChange={e => this.onChange(e)}
                  placeholder="E-mail"
                />
              </div>
              <div className="uk-inline uk-margin-bottom">
                <input
                  className="uk-input"
                  name="password"
                  type="password"
                  value={password}
                  required={true}
                  onChange={e => this.onChange(e)}
                  placeholder="Hasło"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="uk-container">
            <div className="uk-margin-top uk-flex uk-flex-center uk-margin-bottom">
              <button className="custom-button" type="submit">
                Zaloguj się
              </button>
            </div>
            <hr />
            <div className="uk-margin-top uk-flex uk-flex-middle uk-flex-wrap uk-flex-column uk-margin-bottom">
              <span className="uk-margin-top uk-text-bold uk-display-block">Nie masz konta?</span>
              <button className="custom-button uk-margin-top" onClick={() => this.setState({ redirect: true })}>
                Zarejestruj się
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { setToken, setUrl })(Login)
