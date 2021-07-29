import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';
import Movie, { MovieProps } from './Movie';
import './styles.scss';

function App(): JSX.Element {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState<MovieProps | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://api.tvmaze.com/shows`);
      setMovies(res.data);
    };
    fetchData();
  }, []);

  const getMovie = async (id: string) => {
    const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
    setMovie(res.data);
  };

  return (
    <Router>
      <div id="container">
        <Switch>
          <Route exact path="/" render={() => <MovieList movies={movies} />} />
          <Route
            path="/shows/:id"
            render={(props) => (
              <Movie {...props} getMovie={getMovie} movie={movie} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
