import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/Api';
import styles from './MoviesDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { id } = useParams(); 
  const [movieDetails, setMovieDetails] = useState(null);

 
  const fetchMovieDetails = async () => {
    try {
      const response = await api.getMovieDetails(id);
      setMovieDetails(response);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };


  useEffect(() => {
    fetchMovieDetails();
  }, [id, fetchMovieDetails ]);

  
  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, release_date, overview, credits, vote_average } = movieDetails;

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>Release Year: {release_date && release_date.slice(0, 4)}</p>
      <p>Plot Summary: {overview}</p>
      
   
      <div>
        <h2>Cast</h2>
        <ul>
          {credits.cast.slice(0, 5).map((castMember) => (
            <li key={castMember.id}>{castMember.name}</li>
          ))}
        </ul>
      </div>
      
      <p>Average Rating: {vote_average}</p>
      
     
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default MovieDetailsPage;
