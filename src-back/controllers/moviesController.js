let movies = [
  { id: 1, title: 'Начало', status: 'watched' },
  { id: 2, title: 'Матрица', status: 'watched' },
  { id: 3, title: 'Форрест Гамп', status: 'want' }
];

export const getMovies = (req, res) => {
  const { status } = req.query;
  let result = movies;

  if (status) {
    result = movies.filter(m => m.status === status);
  }

  res.json({ 
    success: true,
    count: result.length, 
    data: result 
  });
};

export const addMovie = (req, res) => {
  const { title } = req.body;
  
  if (!title || !title.trim()) {
    return res.status(400).json({ 
      success: false,
      error: 'Название фильма обязательно' 
    });
  }

  const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
  const newMovie = {
    id: newId,
    title: title.trim(),
    status: 'want'
  };
  
  movies.push(newMovie);
  
  res.status(201).json({
    success: true,
    data: newMovie
  });
};

export const toggleMovieStatus = (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  
  if (!movie) {
    return res.status(404).json({ 
      success: false,
      error: 'Фильм не найден' 
    });
  }

  movie.status = movie.status === 'want' ? 'watched' : 'want';
  
  res.json({
    success: true,
    data: movie
  });
};

export const deleteMovie = (req, res) => {
  const index = movies.findIndex(m => m.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false,
      error: 'Фильм не найден' 
    });
  }

  const deleted = movies.splice(index, 1)[0];
  
  res.json({
    success: true,
    message: 'Фильм удалён',
    data: deleted
  });
};