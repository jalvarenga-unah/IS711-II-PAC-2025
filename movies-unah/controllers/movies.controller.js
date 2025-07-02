
import movies from '../local_db/movies.json' with { type: 'json' }
import { validateMovie } from '../schemas/movie.schema.js'
import { getAllMovies } from '../models/movies.js'
// controlar la integridad de los datos
// que se cumplan todas las reglas de validacion
// controlar los posibles errores
// gestionar las respuestas

export const getAll = async (req, res) => {


    try {
        //TODO: para parsear los datos de la base de datos
        const moviesDB = await getAllMovies()


        const parsedMovies = moviesDB.map((movie) => {
            movie.genres = movie.genres.split(',')

            return movie
        })


        res.json(parsedMovies)

    } catch (error) {
        res.status(400).json({
            message: 'Error al obtener las películas',
        })
    }



}

export const searchByQuery = (req, res) => {


    //TODO: tarea para ustedes, busqueda por genero, por año o genero y año
    const { genre, year } = req.query

    if (genre) {
        //TODO: llamar al movelo para saber si existe el género
        // filtrar por género
        const moviesFiltered = movies.filter((movie) => {
            return movie.genre.some((value) => value.toLowerCase().trim() === genre.toLowerCase().trim())
        })

        res.json(moviesFiltered)

    }

    res.status(404).json({
        message: 'No se ha proporcionado un género para filtrar las películas'
    })

}

export const searchById = (req, res) => {

    const { id } = req.params

    const parsedId = Number(id) // convierte el id a un número

    if (isNaN(parsedId)) {
        res.status(400).json({
            message: 'El id debe ser un número'
        })
    }

    //TODO: llamar al modelo que trae los registros de la base de datos
    const movie = movies.find(({ id }) => {
        return id === parsedId
    })

    if (!movie) {
        res.status(404).json({
            message: 'La película no existe'
        })
    }

    res.json(movie)

}
export const create = (req, res) => {

    const data = req.body // ya con los datos que vienen del body

    const { success, error, data: safeData } = validateMovie(data)

    if (!success) {
        res.status(400).json(error)
    }

    const id = Date.now() // genera un id único basado en la fecha actual
    safeData.id = id // asigna el id a los datos de la película

    //llamar al servicio de movies
    movies.push(safeData) // agrega la película al array de películas

    res
        .status(201) // establece el código de estado HTTP a 201 (Creado)
        .json(req.body)
}

export const deleteMovie = (req, res) => {

    const { id } = req.params
    const parsedId = Number(id)

    if (isNaN(parsedId)) {
        return res.status(400).json({
            message: 'El id no existe'
        })
    }

    const index = movies.findIndex((movie) => movie.id == parsedId) // busca el índice de la película a eliminar)


    // findIndex devuelve -1 si no encuentra el elemento
    if (index === -1) {
        res.status(400).json({
            message: 'La película no existe'
        })
    }

    movies.splice(index, 1) // muta el array/lista origial

    res.json({
        message: 'Pelicula eliminada correctamente',
    })
}

export const update = (req, res) => {
    const { id } = req.params
    const parsedId = Number(id)

    if (isNaN(parsedId)) {
        return res.status(400).json({
            message: 'El id no existe'
        })
    }

    //TODO: validar todas las reglas de los datos que voy a actualizar
    const data = req.body // ya con lo que voy a a actualizar


    //obtener el recurso que voy a actualizar, para saber si existe
    const index = movies.findIndex((movie) => movie.id == parsedId)

    // findIndex devuelve -1 si no encuentra el elemento
    if (index === -1) {
        res.status(400).json({
            message: 'La película no existe'
        })
    }

    // actualizar el recurso
    const movieUpdated = { id: parsedId, ...data }
    movies[index] = movieUpdated

    res.json({
        message: 'Pelicula actualizada correctamente',
    })

}


