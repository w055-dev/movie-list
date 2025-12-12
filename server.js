import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import moviesRoutes from './src-back/routes/moviesRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Логгер middleware
const logger = (req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
  next();
};
app.use(logger);

// Маршруты API
app.use('/api/movies', moviesRoutes);

// Статические файлы 
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api-check.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/movies`);
  console.log(`Статик: http://localhost:${PORT}/`);
});