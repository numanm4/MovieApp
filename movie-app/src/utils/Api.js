const API_KEY = '93bc967f988fe03503f9eb36668ebb6b'; // TMDB API KEY
const READ_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2JjOTY3Zjk4OGZlMDM1MDNmOWViMzY2NjhlYmI2YiIsInN1YiI6IjY1ZjBlZDFkMGU0ZmM4MDE0YWNhMjBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ksb924DcJj08Wu5_f2xn1b2bAueLI5uPJXzBPb-9l5g';

const api = {
  // Function to fetch top-rated movies
  getTopRatedMovies: async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`, {
        headers: {
          Authorization: `Bearer ${READ_ACCESS_TOKEN}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top-rated movies:', error);
    }
  },

  // Function to search for movies by title
  searchMovies: async (query, page = 1) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${READ_ACCESS_TOKEN}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  },

  // Function to fetch movie details by ID
  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`, {
        headers: {
          Authorization: `Bearer ${READ_ACCESS_TOKEN}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  },

  // Function to fetch movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${READ_ACCESS_TOKEN}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
    }
  }
};

export default api;
