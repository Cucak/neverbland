import { useState } from 'react';
import MovieCard from '../MovieCard';

type Movie = {
  image: {
    medium: string;
  };
  name: string;
  rating: {
    average: string;
  };
  id: number;
  premiered: string;
};

type MovieListProps = { movies: Array<Movie> };

const MovieList: React.FC<MovieListProps> = ({ movies }: MovieListProps) => {
  const [number, setNumber] = useState(20);
  return (
    <div id="home-view">
      <header>
        <h1>TV Bland</h1>
        <p>TV Show and web series database.</p>
        <p>
          Create personaliosed scheudles. Episode guide, cast, crew and
          character information.
        </p>
      </header>
      <section>
        <h2>Last Added Shows</h2>
        <div className="movie-list">
          {movies.slice(0, number).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="show-more" onClick={() => setNumber(number + 20)}>
          Show More
        </button>
      </section>
    </div>
  );
};

export default MovieList;
