import { createServer } from 'node:http'

// mi serviro web
const server = createServer((req, res) => {

    // ? para devolver una respuesta al cliente en texto plano/html
    // res.end('<h1>Hola mundo desde Node.js!!!!</h1>') // estoy devolviendo una respuesta al cliente

    // establecer información en el encabezado de la respuesta
    res.writeHead(200, 'Content-Type: application/json')


    const { url, method } = req // desestructuración de la petición 


    //? se tranforma el formato a string
    res.end(JSON.stringify({
        success: true,
        message: 'Hola mundo'
    }))

})

//escuchando todas las peticiones
server.listen(3000, () => {

    console.log('Server is running on http://localhost:3000')
})