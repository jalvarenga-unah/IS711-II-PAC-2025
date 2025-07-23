
import jwt from 'jsonwebtoken' // para verificar el token


export const isAuth = (req, res, next) => {

    // obtener los encabezados de la petición (token)
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({
            success: false,
            message: 'Debe iniciar sesión para acceder a este recurso',
        })
        return
    }

    const token = authorization.split(' ')[1]
    // validar que el token sea válido

    try {

        const { role, id } = jwt.verify(token, process.env.JWT_SECRET)

        req.params.role = role
        req.params.id = id


        next()
    } catch (error) {

        res.status(401).json({
            success: false,
            message: 'Debe iniciar sesión para acceder a este recurso',
        })
        return

    }

    // validar que el token no haya expirado

    // si cumple con las validaciones, continuar con la siguiente función del middleware o controlador

    // la ultima parte de la peticion (return)
    // res.status(401).json({
    //     message: 'Autenticación requerida'
    // })

    // next() // permite continuar con la siguiente función del middleware o controlador
    // si no se llama a next(), la petición se queda ahí y no continúa
}