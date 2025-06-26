import jwt from 'jsonwebtoken' // para generar el token

export const login = (req, res) => {

    const data = {
        id: 125236,
        name: 'Juan Alvarenga',
        email: 'jealvarengar@unah.edu.hn',
        password: '$dri3omweihfeˆ#$346.23823523',
        role: 'admin',
        phone: '9999-9999',
    };

    const payload = {
        id: data.id,
        role: data.role,

    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256', // Sha2
        expiresIn: '1h'
    })

    delete data.password


    res.json({
        success: true,
        message: 'Usuario autenticado correctamente',
        data: data,
        token
    })


}