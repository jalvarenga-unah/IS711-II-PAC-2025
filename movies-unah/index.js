import express from 'express'
import movies from './local_db/movies.json' with { type: 'json' }
import { Message } from 'firebase-functions/pubsub'

const app = express() // para crear la aplicación de express
const PORT = process.env.PORT || 3000 // puerto donde se ejecutará la aplicación

// middlewares
app.use(express.json()) // se encarga de parsear el body de las peticiones
// app.use((req, res, next) => {

//     let body = '';

//     req.on('data', (chunk) => {
//         body += chunk.toString(); // convierte el buffer a string
//     });

//     req.on('end', () => {
//         req.body = JSON.parse(body); // convierte el string a JSON
//         next()
//     })

//     console.log('Middleware ejecutado');
// })

// rutas

app.get('/', (req, res) => {
    res.send('<h1>Hola mundo desde Express!!</h1>')
})

app.get('/movies', (req, res) => {
    // devuelve en formato JSON una lista de películas en los encabezados
    res.json(movies)
})

app.get('/movies/search', (req, res) => {

    //TODO: tarea para ustedes, busqueda por genero, por año o genero y año
    const { genre, year } = req.query

    if (genre) {
        // filtrar por género
        const moviesFiltered = movies.filter((movie) => {
            return movie.genre.some((value) => value.toLowerCase().trim() === genre.toLowerCase().trim())
        })

        res.json(moviesFiltered)

    }

    res.status(404).json({
        message: 'No se ha proporcionado un género para filtrar las películas'
    })

})

app.get('/movies/:id', (req, res) => {

    const { id } = req.params

    const parsedId = Number(id) // convierte el id a un número

    if (isNaN(parsedId)) {
        res.status(400).json({
            message: 'El id debe ser un número'
        })
    }

    const movie = movies.find(({ id }) => {
        return id === parsedId
    })

    if (!movie) {
        res.status(404).json({
            message: 'La película no existe'
        })
    }

    res.json(movie)

})

app.post('/movies', (req, res) => {

    const id = Date.now() // genera un id único basado en la fecha actual

    req.body.id = id
    movies.push(req.body) // agrega la película al array de películas

    res
        .status(201) // establece el código de estado HTTP a 201 (Creado)
        .json(req.body)
})

//actualizar
app.put('/movies/:id', (req, res) => { })
// eliminar
app.delete('/movies/:id', (req, res) => { })

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})    