import { Router } from 'express'
import MovieController from '../controllers/movies.controller.js'

const moviesRouter = Router()

//añadir proteccion a las rutas
moviesRouter.get('/', (req, res) => {
    MovieController.getAll(req, res)
})
moviesRouter.get('/search', MovieController.searchByQuery)
moviesRouter.get('/:id', MovieController.searchById)
moviesRouter.post('/', MovieController.create)
moviesRouter.delete('/:id', MovieController.delete)
moviesRouter.patch('/:id', MovieController.update)


export default moviesRouter