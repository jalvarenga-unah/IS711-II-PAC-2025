import express from 'express'
import movies from './local_db/movies.json' with { type: 'json' }

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
    res.send('<h1>Hola mundo desde Express!</h1>')
})

app.get('/movies', (req, res) => {
    // devuelve en formato JSON una lista de películas en los encabezados
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {

    const { id } = req.params
    const { query } = req

    res.json({
        id,
        query
    })

})

app.post('/movies', (req, res) => {

    movies.push(req.body) // agrega la película al array de películas

    res
        .status(201) // establece el código de estado HTTP a 201 (Creado)
        .json(req.body)
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})    