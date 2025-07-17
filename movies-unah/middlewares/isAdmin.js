

export const isAdmin = (req, res, next) => {

    const { role, id } = req.params

    //TODO: validar en DDBB que el rol sea el mismo del token

    if (role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. Se requiere rol de administrador.',
        })
    }

    next()
}