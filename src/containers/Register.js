import React, { Component } from 'react'
import api from '../api'
import { Redirect } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { setUrl } from '../actions/user';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      password:'',
      redirect:false    
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    const { name, email, password } = this.state;
    const { setUrl } = this.props;
    const params = {
      user:{
        name:name,
        email:email,
        password:password
      }
    }
    
    api.signUp(params)
      .then(() => {
        notify.show('User has been created','success')
        this.setState({ redirect: true })
      })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { name, email, password, redirect } = this.state;
    if(redirect){
      return(
        <Redirect to ="/" />
      )
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1 className="text--orange uk-text-center">Rejestracja</h1>
          <hr></hr>
          <div className="uk-container uk-flex uk-flex-center uk-flex-wrap">
            <div className="uk-flex uk-flex-center uk-flex-wrap uk-flex-column uk-margin-bottom uk-margin-top">
              <div className="uk-inline">
                <input className="uk-input" type="text" placeholder="Nazwa użytkownika" name="name" value={name} onChange={e => this.onChange(e)} />
              </div>
              <div className="uk-inline uk-margin-top">
                <input className="uk-input" type="text" placeholder="E-mail" name="email" value={email} onChange={e => this.onChange(e)} />
              </div>
              <div className="uk-inline uk-margin-top">
                <input className="uk-input" type="password" placeholder="Hasło" name="password" value={password} onChange={e => this.onChange(e)} />
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="uk-container">
            <div className="uk-container uk-margin-top">
              <div className="uk-flex uk-flex-wrap uk-flex-center uk-margin-bottom uk-margin-top">
                <button className="custom-button" type="submit">Stwórz konto</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { setUrl })(Register)
