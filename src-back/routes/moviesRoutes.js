import express from 'express';
import * as controller from '../controllers/moviesController.js';

const router = express.Router();
router.get('/', controller.getMovies);
router.post('/', controller.addMovie);
router.put('/:id/toggle', controller.toggleMovieStatus);
router.delete('/:id', controller.deleteMovie);

export default router;