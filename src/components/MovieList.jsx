import React from 'react'

const MovieList = ({ movies, onToggleStatus, onDeleteMovie }) => {
  if (movies.length === 0) {
    return <p className="empty">Нет фильмов</p>
  }
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-item">
          <span className="movie-title">{movie.title}</span>
          <div className="movie-actions">
            <button onClick={() => onToggleStatus(movie.id)} className="btn btn-toggle">{movie.status === 'want' ? 'Посмотрел' : 'Назад'}</button>
            <button onClick={() => onDeleteMovie(movie.id)} className="btn btn-delete">Удалить</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList