import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import api from '../api'

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state={
      movies:[],
      series:[]
    }
  }

  componentDidMount(){
    api.getMovies()
      .then( res => this.setState({ movies: res.data }))
      .then( () => {
        api.getSeries()
          .then( res => this.setState({ series: res.data }))
      })
  }

  render() {
    const { user } = this.props;
    console.log(this.state)
    if (!user.token.jwt ) {
      return(
        <Redirect to ="/" />
      )
    }
    return (
      <div className="uk-grid">
        <div className="uk-width-1-1 uk-margin-bottom">
          <h1>Filmy: 
          </h1>
          <div>
            { this.state.movies.map((movie, key) => {
              return(
                <Link key={key} to={{ pathname: `/movie`, movie:movie }}>
                  <p>{movie.title}</p>
                </Link>
              )
            })}
          </div>
          <h1>Seriale: </h1>
          {this.state.series.map((serie, key) => {
            return (
              <Link key={key} to={{ pathname: `/series`, serie: serie }}>
                <p>{serie.name}</p>
              </Link>
            )
          })}
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

export default connect(mapStateToProps, {})(Dashboard)
