import pool from '../config/db.js'

export const loginUser = async (user) => {

    // obtener el registro del usuario
    const query = `SELECT BIN_TO_UUID(id) as id,  name,email,phone,must_change_password,password_hash,role,created_at  FROM users WHERE email = ?  `

    const [results] = await pool.query(query, [user])

    return results[0]

}

export const register = async (user) => {

    const query = `INSERT INTO users (id, name, email, phone, password_hash, must_change_password, role) 
                    VALUES ( UUID_TO_BIN(?), ?, ?, ?, ?, 1, ?)`

    const [rows] = await pool.query(query, [...user])

    return rows

}

export const updatePassword = async (id, password_hash) => {

    const query = `UPDATE users SET password_hash = ?,
             must_change_password = 0 WHERE id = UUID_TO_BIN(?)`


    const [rows] = await pool.query(query, [password_hash, id])

    return rows

}