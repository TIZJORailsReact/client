import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSeasons } from '../actions/user'
import { Redirect, Link } from 'react-router-dom'
import api from '../api'

class Seasons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      episodes: [],
      season:{}
    }
  }

  componentDidMount() {
    if(this.props.location.season){
      api.getEpisodes(this.props.location.season.id)
      .then(res => this.setState({ episodes: res.data }))
      this.setState({ season: this.props.location.season }, () => {
        this.props.setSeasons(this.state.season)
      })
    }
    else{
      this.setState({season: this.props.seasons})
      api.getEpisodes(this.props.seasons.id)
        .then(res => this.setState({ episodes: res.data }))
    }
  }
  render() {
    const { user } = this.props;
    if (!user.token.jwt) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div>
        <h1>{this.state.season.name}</h1>
        {this.state.episodes.map((episode, key) => {
          return (
            <Link key={key} to={{ pathname: `/series/${this.state.season.id}/seasons/${this.state.season.id}/episodes/${episode.id}`, episode: episode, sid: this.props.location.sid }}>
              <p>{episode.name}</p>
            </Link>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    seasons:state.user.seasons
  }
}

export default connect(mapStateToProps, { setSeasons })(Seasons)
