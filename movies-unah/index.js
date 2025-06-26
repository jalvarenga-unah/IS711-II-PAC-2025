import express from 'express'
import cors from 'cors' // disponible gracias a la instalación
import authRoutes from './routes/auth.routes.js' // rutas de autenticación
import moviesRoutes from './routes/movies.routes.js'
import dotenv from 'dotenv' // para cargar las variables de entorno desde el archivo .env

const app = express() // para crear la aplicación de express

dotenv.config()// cargar las varianles del entorno desde el archivo .env

const PORT = process.env.PORT || 3000 // puerto donde se ejecutará la aplicación

// middlewares
app.use(express.json()) // se encarga de parsear el body de las peticiones
app.use(cors({
    // configuración de los origenes permitidos
    origin: [
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'https://prod.server.com',
        'https://test.server.com'
    ],
    // metodos permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // encabezados permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'Bearer', 'api-key']
}))

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

// rutas de peliculas
app.use('/movies', moviesRoutes)

//rutas de autenticación
app.use('/auth', authRoutes)

// ruta por defecto, cuando no hace match 
app.use((req, res) => {
    res.status(404).json(
        {
            message: `${req.url} no encontrada`
        }
    )
})


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})    