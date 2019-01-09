import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import api from '../api'

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      seasons:[]
    }
  }

  componentDidMount(){
    api.getSeasons(this.props.location.serie.id)
      .then(res => this.setState({ seasons: res.data}))
  }
  render() {
    const { user } = this.props;
    console.log(this.state)
    if (!user.token.jwt) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div>
        <h1>{this.props.location.serie.name}</h1>
        {this.state.seasons.map((season, key) => {
          return(
            <Link key={key} to={{ pathname: `/seasons`, season: season }}>
              <p>{season.name}</p>
            </Link>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {})(Series)
