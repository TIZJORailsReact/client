import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import api from '../api'

class Movie extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect:false,
      liked:false,
    }
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount(){
    api.getFavouritesMovies(this.props.user.current.name)
      .then(res => {
        let movie = res.data.filter(movie => movie.title === this.props.location.movie.title)
        movie.length === 0 ? this.setState({ liked: false }) : this.setState({ liked: true})          
      })
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  handleLike(){
    if(this.state.liked){
      api.removeLike(this.props.location.movie.id, this.props.user.current.name)
      .then( () => this.setState({ liked: false}))
    }
    else{
      const params = {
        "like":{
          "login":this.props.user.current.name
        }
      }
      api.addLike(this.props.location.movie.id, params)
        .then(() => this.setState({ liked: true }))
    }
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
    };
    const { user } = this.props;
    if (!user.token.jwt) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div className="uk-flex uk-flex-wrap uk-flex-column">
        <p>Tytuł: {this.props.location.movie.title}</p>
        <p>Gatunek: {this.props.location.movie.genre}</p>
        <YouTube
          videoId={this.props.location.movie.link}
          opts={opts}
          onReady={this._onReady}
        />
        <div className="uk-display-inline-block">
          <button onClick={this.handleLike} className="custom-button">
            {this.state.liked ? 'Nie lubię tego' : 'Lubię to'}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user:state.user
  }
}

export default connect(mapStateToProps, {})(Movie)
