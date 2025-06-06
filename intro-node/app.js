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

// Las variabes de entorno son variables que se pueden configurar
// a nivel de sistema operativo y que pueden ser utilizadas por la aplicación
const port = process.env.PORT || 3000

//escuchando todas las peticiones

// si el puerto es 0, el sistema operativo 
// asignará un puerto libre automáticamente
server.listen(port, () => {

    // obteniendo el puerto en el que se está escuchando
    // const port = server.address().port
    const { port } = server.address()

    console.log(`Server is running on http://localhost:${port}`)
})