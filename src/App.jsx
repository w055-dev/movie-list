import React, { useState } from 'react'
import Menu from './components/Menu'
import './index.css'

function App() {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Интерстеллар', status: 'want' },
    { id: 2, title: 'Начало', status: 'watched' },
    { id: 3, title: 'Матрица', status: 'want' },
    { id: 4, title: 'Иллюзия обмана 3', status: 'want'},
    { id: 5, title: 'Унесённые призраками', status: 'watched'}
  ])
  const addMovie = (title) => {
    const newMovie = {
      id: Date.now(),
      title,
      status: 'want'
    }
    setMovies([...movies, newMovie])
  }
  const toggleStatus = (id) => {
    setMovies(movies.map(movie =>
      movie.id === id
        ? { ...movie, status: movie.status === 'want' ? 'watched' : 'want' }
        : movie
    ))
  }
  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id))
  }
  return (
    <div className="app">
      <header className="header">
        <h1>Список фильмов</h1>
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