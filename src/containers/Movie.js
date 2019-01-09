import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Movie extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect:false
    }
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
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
      <div>
        <p>Tytuł: {this.props.location.movie.title}</p>
        <p>Gatunek: {this.props.location.movie.genre}</p>
        <YouTube
          videoId={this.props.location.movie.link}
          opts={opts}
          onReady={this._onReady}
        />
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
