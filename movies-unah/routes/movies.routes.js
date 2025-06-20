import { Router } from 'express'

import { isAuth } from '../middlewares/isAuth.js'

import {
    // searchByQuery as search, // un alias a la función para evitar duplicados
    searchById,
    create,
    deleteMovie,
    update,
    getAll
} from '../controllers/movies.controller.js'

const moviesRouter = Router()

//añadir proteccion a las rutas
moviesRouter.get('/', isAuth, (req, res) => {
    getAll(req, res)
})

// moviesRouter.get('/search', search)
moviesRouter.get('/:id', isAuth, searchById)

moviesRouter.post('/', isAuth, create)

moviesRouter.delete('/:id', isAuth, deleteMovie)

moviesRouter.patch('/:id', isAuth, update)


export default moviesRouter