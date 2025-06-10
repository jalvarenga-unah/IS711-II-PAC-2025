import { createServer } from 'node:http'

// mi serviro web
const server = createServer((req, res) => {

    // ? para devolver una respuesta al cliente en texto plano/html
    // res.end('<h1>Hola mundo desde Node.js!!!!</h1>') // estoy devolviendo una respuesta al cliente

    // establecer información en el encabezado de la respuesta
    // res.writeHead(200, 'Content-Type: application/json')

    const { url, method } = req // desestructuración de la petición 


    // metodo de la petición
    // GET: OBTENER UNA RECURSO // -> no viajan de forma segura
    // POST: CREAR UN RECURSO
    // PUT: ACTUALIZAR UN RECURSO
    // PATCH: ACTUALIZAR UN RECURSO (Parcial)
    // DELETE: ELIMINAR UN RECURSO

    switch (method) {
        case 'GET':

            if (url === '/') {
                res.end(JSON.stringify({
                    success: true,
                    message: 'Hola mundo'
                }))
                return
            } else if (url === '/movies') {
                res.end(JSON.stringify({
                    success: true,
                    data: []
                }))
                return
            }

            break
        case 'POST':

            if (url === '/movies') {
                //verifcar si está autenticado
                // verificar si el usuario tiene permisos para crear una película

                //caputar la información del cuerpo de la petición
                let body = ''
                // stream de datos -> es un flujo continuo de datos
                req.on('data', (chunk) => {
                    body += chunk.toString() // convertir el buffer a string
                })

                // cuando finalice la recibir los datos enviados
                req.on('end', () => {

                    req.body = JSON.parse(body) // convertir el string a objeto JSON

                })

                //middleware

                // validar que esos datos son correctos
                // preparar los datos
                // guardar los datos en una base de datos
                // responder al cliente
                res.writeHead(201, 'Content-Type: application/json')
                res.end(JSON.stringify({
                    success: true,
                    message: 'Película creada correctamente',
                    data: {}
                }))
                return
            }
            break
        case 'PUT':

            break
        case 'DELETE':

            break
        default:
            res.end(JSON.stringify({
                success: true,
                message: 'metodo no soportado'
            }))
    }

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