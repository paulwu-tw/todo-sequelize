import express from 'express'
import { home } from './modules/home.js'
import { users } from './modules/users.js'
const router = express.Router()

router.use('/users', users)
router.use('/', home)

export { router }