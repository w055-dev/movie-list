import React, { useState } from 'react'

const MovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAddMovie(title.trim())
      setTitle('')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название фильма"
        className="movie-input"
      />
      <button type="submit" className="btn btn-add">Добавить</button>
    </form>
  )
}

export default MovieForm