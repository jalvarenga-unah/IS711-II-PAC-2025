import pool from '../config/db.js'

export const loginUser = async (user) => {

    // obtener el registro del usuario
    const query = `SELECT * FROM users WHERE email = ?  `

    const [results] = await pool.query(query, [user])

    return results[0]

}

export const register = async (user) => {

    const query = `INSERT INTO users (id, name, email, phone, password_hash, must_change_password) 
                    VALUES ( UUID_TO_BIN(?) ?, ?, ?, ?, 1)`

    await pool.query(query, [...user])

}