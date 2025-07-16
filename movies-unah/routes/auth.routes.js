
import { Router } from 'express'
import { login, createUser, setPassword } from '../controllers/auth.controller.js'

const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/register', createUser)
authRoutes.patch('/set-password', setPassword)

export default authRoutes
