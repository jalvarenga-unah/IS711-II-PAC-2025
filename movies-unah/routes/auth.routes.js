
import { Router } from 'express'
import { login, createUser } from '../controllers/auth.controller.js'

const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/register', createUser)

export default authRoutes
