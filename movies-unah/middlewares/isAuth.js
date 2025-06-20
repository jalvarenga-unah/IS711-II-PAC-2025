



export const isAuth = (req, res, next) => {

    // TODO:
    // obtener los encabezados de la petición (token)
    // validar que el token sea válido
    // validar que el token no haya expirado

    // si cumple con las validaciones, continuar con la siguiente función del middleware o controlador

    // la ultima parte de la peticion (return)
    // res.status(401).json({
    //     message: 'Autenticación requerida'
    // })

    next() // permite continuar con la siguiente función del middleware o controlador
    // si no se llama a next(), la petición se queda ahí y no continúa
}