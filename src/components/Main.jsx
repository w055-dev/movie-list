import React from 'react'
import MovieList from './MovieList'
import MovieForm from './MovieForm'

const Main = ({ movies, onAddMovie, onToggleStatus, onDeleteMovie }) => {
  const wantToWatch = movies.filter(movie => movie.status === 'want')
  const watched = movies.filter(movie => movie.status === 'watched')
  return (
    <main className="main">
      <MovieForm onAddMovie={onAddMovie} />
      <div className="movies-grid">
        <section className="section">
          <h2>Хочу посмотреть ({wantToWatch.length})</h2>
          <MovieList
            movies={wantToWatch}
            onToggleStatus={onToggleStatus}
            onDeleteMovie={onDeleteMovie}
          />
        </section>
        <section className="section">
          <h2>Посмотрено ({watched.length})</h2>
          <MovieList
            movies={watched}
            onToggleStatus={onToggleStatus}
            onDeleteMovie={onDeleteMovie}
          />
        </section>
      </div>
    </main>
  )
}

export default Main