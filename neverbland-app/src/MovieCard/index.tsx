import { Link } from 'react-router-dom';

type Movie = {
  movie: {
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
};

const MovieCard: React.FC<Movie> = ({
  movie: { image, name, rating, id, premiered },
}: Movie) => {
  return (
    <div id="card">
      <div className="img-wrapper">
        <img src={image.medium} />
      </div>
      <Link
        to={`shows/${id}`}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
        }}
      />
      <div className="card-content">
        <div className="card-title">
          {name} ({premiered.split('-')[0]})
        </div>
        <div className="rating">{rating.average}</div>
      </div>
    </div>
  );
};

export default MovieCard;
