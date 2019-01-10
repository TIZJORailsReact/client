import axios from "axios";
import store from "../store";

const url = "http://localhost:3000/";
// const microMoviesUrl="http://micro-movies.herokuapp.com/"
// const microSeriesUrl="http://micro-series.herokuapp.com/"

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: "",
      created: false
    });
  }

  setHeaders() {
    this.api.defaults.headers.common['authorization'] = `Bearer ${store.getState().user.token}`;
  }

  signUp(params){
    const api = axios.create({
      baseURL: "http://localhost:3000/",
      created: false
    });
    return api.post('users/create', params)
  }
  
  signIn(params){
    const api = axios.create({
      baseURL: "http://localhost:3000/",
      created: false
    });
    return api.post('user_token',params);
  }

  getMovies(login){
    console.log(login, "LOGIN")
    const api = axios.create({
      baseURL: "http://micro-movies.herokuapp.com/",
      created: false
    });
    return api.get(`movies?login=${login}`);
  }

  getCurrentUser(params){
    const api = axios.create({
      baseURL: "http://localhost:3000/",
      created: false
    });
    this.api.defaults.headers.common['authorization'] = `Bearer ${params}`;
    return api.get('users/current');
  }

  getMovie(params){
    const api = axios.create({
      baseURL: "http://micro-movies.herokuapp.com/",
      created: false
    });
    return api.get(`movies/${params}`);
  }

  getFavouritesMovies(params){
    const api = axios.create({
      baseURL: "http://micro-movies.herokuapp.com/",
      created: false
    });
    return api.get(`favorites/movies?login=${params}`);
  }

  getFavouritesSeries(params){
    const api = axios.create({
      baseURL: "http://micro-series.herokuapp.com/",
      created: false
    });
    return api.get(`favorites/series?login=${params}`);
  }

  getSeries(login){
    const api = axios.create({
      baseURL: "http://micro-series.herokuapp.com/",
      created: false
    });
    return api.get(`series?login=${login}`);
  }

  getSerie(params){
    const api = axios.create({
      baseURL: "http://micro-series.herokuapp.com/",
      created: false
    });
    return api.get(`series/${params}`);
  }

  getSeasons(params){
    const api = axios.create({
      baseURL: "http://micro-series.herokuapp.com/",
      created: false
    });
    return api.get(`series/${params}/seasons`);
  }

  addLike(id,params){
    const api = axios.create({
      baseURL: "http://micro-movies.herokuapp.com/",
      created: false
    });
    return api.post(`movies/${id}/likes`, params);
  }

  removeLike(params,login){
    const api = axios.create({
      baseURL: "http://micro-movies.herokuapp.com/",
      created: false
    });
    return api.delete(`movies/${params}/likes?login=${login}`);
  }

  addLikeSeries(id,params){
    const api = axios.create({
      baseURL: "http://micro-series.herokuapp.com/",
      created: false
    });
    return api.post(`series/${id}/likes`, params);
  }

  removeLikeSeries(params,login){
    const api = axios.create({
      baseURL: "http://micro-series.herokuapp.com/",
      created: false
    });
    return api.delete(`series/${params}/likes?login=${login}`);
  }

  getEpisodes(params){
    const api = axios.create({
      baseURL: "http://micro-series.herokuapp.com/",
      created: false
    });
    return api.get(`seasons/${params}/episodes`);
  }

  getEpisode(params){
    const api = axios.create({
      baseURL: "http://micro-series.herokuapp.com/",
      created: false
    });
    return api.get(`episodes/${params}`);
  }
}

export default Api;