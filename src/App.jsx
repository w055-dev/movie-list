import React, { useState, useEffect } from 'react'
import Menu from './components/Menu'
import './App.css'

const API_URL = '/api/movies'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMovies();
  }, [])

  const fetchMovies = async () => {
    try {
      setLoading(true);
      console.log('Запрос к:', API_URL);
      const response = await fetch(API_URL);
      console.log('Ответ:', response.status, response.statusText);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Данные:', data);
      setMovies(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      setError(`Ошибка загрузки: ${err.message}. Проверьте, запущен ли сервер на порту 3001.`);
    } finally {
      setLoading(false);
    }
  }

  const addMovie = async (title) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      console.log('Ответ на добавление:', response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка добавления фильма');
      }

      const result = await response.json();
      console.log('Добавленный фильм:', result);
      setMovies([...movies, result.data]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    }
  }

  const toggleStatus = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PUT'
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка изменения статуса');
      }
      
      const result = await response.json();
      setMovies(movies.map(movie =>
        movie.id === id ? result.data : movie
      ))
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    }
  }

  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка удаления фильма');
      }
      
      setMovies(movies.filter(movie => movie.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    }
  }

  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Список фильмов</h1>
        </header>
        <div className="loading">
          <p>Загрузка фильмов...</p>
          <p>API URL: {API_URL}</p>
          {error && <p className="error-message">Ошибка: {error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Список фильмов</h1>
        {error && <div className="error-message">Ошибка: {error}</div>}
      </header>
      <Menu
        movies={movies}
        onAddMovie={addMovie}
        onToggleStatus={toggleStatus}
        onDeleteMovie={deleteMovie}
      />
    </div>
  )
}

export default App