import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { connect } from 'react-redux'
import { clearToken, setCurrentUser } from '../actions/user'
import { Redirect, Link } from 'react-router-dom'
import api from '../api'

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state={
      movies:[],
      series:[],
      signOut:false,
      recommendedMovies:[],
      recommendedSeries:[],
      favouritesMovies:[],
      favouritesSeries:[]
    }
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount(){
    api.getCurrentUser(this.props.user.token.jwt)
      .then(res => this.props.setCurrentUser(res.data))
      .then(() => {
        api.getFavouritesMovies(this.props.user.current.name)
          .then(res => this.setState({ favouritesMovies: res.data }))
          .then(() => {
              api.getMovies(this.props.user.current.name)
                .then(res => this.setState({ movies: res.data.movies, recommendedMovies: res.data.recommended }))
                .then(() => {
                  api.getSeries(this.props.user.current.name)
                    .then(res => this.setState({ series: res.data.series, recommendedSeries: res.data.recommended}))
                    .then(() => {
                      api.getFavouritesSeries(this.props.user.current.name)
                        .then(res => this.setState({ favouritesSeries: res.data }))
                    })
                })
          })
      })

  }

  signOut(){
    this.props.clearToken()
    this.setState({ signOut: true})
  }

  render() {
    const { user } = this.props;
    if (!user.token.jwt || this.state.signOut ) {
      return(
        <Redirect to ="/" />
      )
    }
    return (
      <div className="uk-grid">
        <div className="uk-width-1-1 uk-flex uk-flex-wrap uk-margin-bottom">
          <div className="uk-width-1-1 uk-flex uk-flex-between uk-margin-bottom">
            <h1>MicroMovies App</h1>
            <span>Witaj: {user.current.name}</span>
            <button className="custom-button" onClick={this.signOut}>Wyloguj</button>
          </div>
          <div className="uk-width-1-2 uk-margin-bottom">
            <h1>Polecane filmy: </h1>
            {this.state.recommendedMovies.map((movie, key) => {
              return (
                <Link key={key} to={{ pathname: `/movie/${movie.id}`, movie: movie }}>
                  <p>{movie.title} : {movie.genre}</p>
                </Link>
              )
            })}
          </div>
          <div className="uk-width-1-2 uk-margin-bottom">
            <h1>Polecane seriale: </h1>
            {this.state.recommendedSeries.map((serie, key) => {
              return (
                <Link key={key} to={{ pathname: `/series/${serie.id}`, serie: serie }}>
                  <p>{serie.name} : {serie.genre}</p>
                </Link>
              )
            })}
          </div>
          <div className="uk-width-1-2 uk-margin-bottom">
            <h1>Ulubione filmy: </h1>
            {this.state.favouritesMovies.map((movie, key) => {
              return (
                <Link key={key} to={{ pathname: `/movie/${movie.id}`, movie: movie }}>
                  <p>{movie.title} : {movie.genre}</p>
                </Link>
              )
            })}
          </div>
          <div className="uk-width-1-2 uk-margin-bottom">
            <h1>Ulubione seriale: </h1>
            {this.state.favouritesSeries.map((serie, key) => {
              return (
                <Link key={key} to={{ pathname: `/series/${serie.id}`, serie: serie }}>
                  <p>{serie.name} : {serie.genre} </p>
                </Link>
              )
            })}
          </div>
          <div className="uk-width-1-2">
            <h1>Filmy: 
            </h1>
            <div>
              { this.state.movies.map((movie, key) => {
                return(
                  <Link key={key} to={{ pathname: `/movie/${movie.id}`, movie:movie }}>
                    <p>{movie.title}</p>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="uk-width-1-2">
            <h1>Seriale: </h1>
            {this.state.series.map((serie, key) => {
              return (
                <Link key={key} to={{ pathname: `/series/${serie.id}`, serie: serie }}>
                  <p>{serie.name}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    user:state.user
  }
}

export default connect(mapStateToProps, {clearToken, setCurrentUser})(Dashboard)
