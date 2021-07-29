import { useState, useEffect } from 'react';
import axios from 'axios';

export type MovieProps = {
  image: {
    medium: string;
  };
  name: string;
  rating: {
    average: string;
  };
  id: number;
  premiered: string;
  summary: string;
  genres: string[];
  language: string;
  rumtime: string;
  schedule: {
    days: string;
  };
  status: string;
};

type Cast = {
  character: {
    name: string;
  };
  person: {
    name: string;
  };
};

type Props = {
  movie?: MovieProps;
  cast?: Array<Cast>;
  match: {
    params: {
      id: string;
    };
  };
  getMovie: (state: string) => void;
};

const Movie: React.FC<Props> = ({ movie, getMovie, match }) => {
  const [craw, setCraw] = useState<Array<Cast> | undefined>(undefined);

  useEffect(() => {
    getMovie(match.params.id);

    check(match.params.id);
  }, []);

  async function check(id: string) {
    if (match.params.id) {
      const res = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`);
      if (res.data) {
        console.log(res.data);

        setCraw(res.data);
      }
    }
  }
  return (
    <div id="movie-info">
      {movie ? (
        <div>
          <h1>TV Bland</h1>
          <header>
            <div id="card">
              <div className="img-wrapper">
                <img src={movie.image.medium} alt={movie.name} />
              </div>
              <div className="card-content">
                <div className="card-title">
                  {movie.name} ({movie.premiered.split('-')[0]})
                </div>
                <div className="rating">{movie.rating.average}</div>
              </div>
            </div>
            <div className="description">
              <p>{movie.summary}</p>
            </div>
          </header>
          <div className="show-info">
            <div className="left-column">
              <h3>Show Info</h3>
              <ul>
                <li>
                  <div className="craw-box-left">Streamed</div>
                  <div className="craw-box-right">BBC THREE</div>
                </li>
                <li>
                  <div className="craw-box-left">Schedule</div>
                  <div className="craw-box-right">{movie.schedule.days[0]}</div>
                </li>
                <li>
                  <div className="craw-box-left">Status</div>
                  <div className="craw-box-right">{movie.status}</div>
                </li>
                <li>
                  <div className="craw-box-left">Genres</div>
                  <div className="craw-box-right">
                    {movie.genres.map((item, i) => (
                      <span key={item[i]}> {item}, </span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

            {craw && (
              <div className="right-column">
                <h3>Starring</h3>
                <ul>
                  {craw[0] ? (
                    <li>
                      <div className="craw-box-left">{craw[0].person.name}</div>
                      <div className="craw-box-right">
                        {craw[0].character.name}
                      </div>
                    </li>
                  ) : null}
                  {craw[1] ? (
                    <li>
                      <div className="craw-box-left">{craw[1].person.name}</div>
                      <div className="craw-box-right">
                        {craw[1].character.name}
                      </div>
                    </li>
                  ) : null}
                  {craw[2] ? (
                    <li>
                      <div className="craw-box-left">{craw[2].person.name}</div>
                      <div className="craw-box-right">
                        {craw[2].character.name}
                      </div>
                    </li>
                  ) : null}
                  {craw[3] ? (
                    <li>
                      <div className="craw-box-left">{craw[3].person.name}</div>
                      <div className="craw-box-right">
                        {craw[3].character.name}
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Movie;
