import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/Api'; 
import styles from './HomePage.module.css';
import Pagination from './Pagination'; 
import './Pagination.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  const fetchMovies = async () => {
    try {
    
      let response;
      if (searchQuery) {
        response = await api.searchMovies(searchQuery, currentPage);
      } else if (selectedGenre) {
        response = await api.getMoviesByGenre(selectedGenre, currentPage);
      } else {
        response = await api.getTopRatedMovies(); 
      }

      setMovies(response.results);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  useEffect(() => {
    fetchMovies(); 
  }, [searchQuery, selectedGenre, currentPage, fetchMovies]);

  return (
    <div className={styles.container}>
      <h1>Top Rated Movies</h1>

      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

     
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
    
      </select>

   
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.title} ({movie.release_date && movie.release_date.slice(0, 4)})
            </Link>
            <span>Rating: {movie.vote_average}</span>
          </li>
        ))}
      </ul>

     
      <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </div>
  );
};

export default HomePage;
