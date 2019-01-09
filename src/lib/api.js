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

  getMovies(){
    const api = axios.create({
      baseURL: "http://micro-movies.herokuapp.com/",
      created: false
    });
    return api.get('movies');
  }

  getMovie(params){
    const api = axios.create({
      baseURL: "http://micro-movies.herokuapp.com/",
      created: false
    });
    return api.get(`movies/${params}`);
  }

  getSeries(){
    const api = axios.create({
      baseURL: "http://micro-series.herokuapp.com/",
      created: false
    });
    return api.get('series');
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