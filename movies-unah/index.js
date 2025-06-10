import express from 'express'

const app = express() // para crear la aplicación de express
const PORT = process.env.PORT || 3000 // puerto donde se ejecutará la aplicación

// rutas

app.get('/', (req, res) => {
    res.send('<h1>Hola mundo desde Express!</h1>')
})

app.get('/movies', (req, res) => {
    // devuelve en formato JSON una lista de películas en los encabezados
    res.json({})
})

app.post('/movies', (req, res) => {
    res
        .status(201) // establece el código de estado HTTP a 201 (Creado)
        .json(req.body)
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})    