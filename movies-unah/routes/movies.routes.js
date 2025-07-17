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
import { isAdmin } from '../middlewares/isAdmin.js'

const moviesRouter = Router()

//añadir proteccion a las rutas
moviesRouter.get('/', (req, res) => {
    getAll(req, res)
})

// moviesRouter.get('/search', search)
moviesRouter.get('/:id', searchById)

moviesRouter.post('/', [isAuth, isAdmin], create)
moviesRouter.delete('/:id', [isAuth, isAdmin], deleteMovie)

moviesRouter.patch('/:id', isAuth, update)


export default moviesRouter