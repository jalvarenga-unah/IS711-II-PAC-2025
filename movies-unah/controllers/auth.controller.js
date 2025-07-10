import jwt from 'jsonwebtoken' // para generar el token
import bcrypt from 'bcrypt'
import { loginUser, register } from '../models/auth.js' // importar el modelo de autenticación

import { v4 as uuidv4 } from 'uuid';

export const login = async (req, res) => {

    const { user, password } = req.body

    const data = await loginUser(user)

    // validar que la contraseña sea correcta


    // validar si no debe cambiar la contraseña


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

    const { name, email, phone } = req.body

    const id = uuidv4()

    //generar una clave
    //TODO: generar una clave aleatoria
    const password_hash = await bcrypt.hash(password, 10)

    const result = await register([id, name, email, phone, password_hash])

    // TODO: envair correro



}