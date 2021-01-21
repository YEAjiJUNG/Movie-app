import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movies';
import "./App.css";

class App extends Component {
  state={
    isLoading: true,
    movies: []
  }
  //componentDidMount함수가 끝날 때까지 시간이 걸릴 수 있다고 해야함 -> async
  // 뭘 기다려야 해? await뒤 , axios 끝날 때까지 기다렸다가 계속해라
  getMovies = async () => {
    const {data: {data: {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoading: false});
  }
  componentDidMount(){
    this.getMovies();
  }
  render() {
    const {isLoading, movies} = this.state;
    return (
      <section className="container">
        { isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
        <Movie 
          key={movie.id}
          id={movie.id} 
          year={movie.year}
          title={movie.title}
          summary={movie.summary}
          poster={movie.medium_cover_image}
          genres={movie.genres}
        />
        ))}
          </div>
        )}
        </section>
    )
  }
}

export default App;