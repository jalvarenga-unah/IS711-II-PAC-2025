
import movies from '../local_db/movies.json' with { type: 'json' }
import { validateMovie } from '../schemas/movie.schema.js'
import { getAllMovies, getMovieById, insertMovie } from '../models/movies.js'
import { v4 as uuidv4 } from 'uuid';
// controlar la integridad de los datos
// que se cumplan todas las reglas de validacion
// controlar los posibles errores
// gestionar las respuestas

export const getAll = async (req, res) => {
    try {

        const moviesDB = await getAllMovies()

        const parsedMovies = moviesDB.map((movie) => {

            if (movie.genres)
                movie.genres = movie.genres.split(',')
            else movie.genres = []

            return movie
        })


        res.json(parsedMovies)

    } catch (error) {
        res.status(400).json({
            message: 'Error al obtener las películas ' + error.message,
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

export const searchById = async (req, res) => {

    const { id } = req.params

    const movie = await getMovieById(id)

    console.log(movie)

    // if (!movie) {
    //     res.status(404).json({
    //         message: 'La película no existe'
    //     })
    // }

    res.status(movie.length === 0 ? 204 : 200).json(movie)

}
export const create = async (req, res) => {

    const data = req.body // ya con los datos que vienen del body

    const { success, error, data: safeData } = validateMovie(data)

    if (!success) {
        res.status(400).json(error)
    }

    //insert en la base de datos
    const id = uuidv4()
    safeData.id = id

    try {
        const response = await insertMovie(safeData)

        res
            .status(201) // establece el código de estado HTTP a 201 (Creado)
            .json(response)
    } catch (error) {
        res.status(400).json({
            message: 'Error al insertar la película: ' + error.message,
        })
    }
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


