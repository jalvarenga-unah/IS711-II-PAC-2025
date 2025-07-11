import jwt from 'jsonwebtoken' // para generar el token
import bcrypt from 'bcrypt'
import { loginUser, register } from '../models/auth.js' // importar el modelo de autenticación
import { Resend } from 'resend'


import { v4 as uuidv4 } from 'uuid';

export const login = async (req, res) => {

    const { user, password } = req.body

    const data = await loginUser(user)

    console.log(data)

    // validar que la contraseña sea correcta
    if (!await bcrypt.compare(password, data.password_hash)) {
        res.status(401).json({
            success: false,
            message: 'Usuario o contraseña incorrectos'
        })

        return
    }

    // validar si no debe cambiar la contraseña
    if (data.must_change_password) {
        // obligarlo a cambiar de contraseña
        //TODO: GENERAR UN TOKEN PROVISIONAL
    }


    // puedo retornar la información del usuario

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

export const createUser = async (req, res) => {

    const { name, email, phone, role } = req.body

    const id = uuidv4()

    //generar una clave
    //TODO: generar una clave aleatoria
    const password_hash = await bcrypt.hash('1234', 10)

    try {
        const result = await register([id, name, email, phone, password_hash, role])

        // TODO: envair correro
        console.log(process.env.RESEND_API_KEY)
        const resend = new Resend(process.env.RESEND_API_KEY)

        // await resend.emails.send({
        //     from: 'jealvarengar@unah.edu.hn',
        //     to: email,
        //     subject: 'Creación de cuenta',
        //     html: '<p>esta es tu clave temporal: <strong> 1234 </strong>  </p>',
        // });


        res.json({
            success: true,
            message: 'Usuario creado correctamente',
            data: {
                id,
                name,
                email,
                phone
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        })
    }



}