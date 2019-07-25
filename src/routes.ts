import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/users', UserController.allUsers)
routes.post('/user', UserController.create)
routes.post('/deleteUser', UserController.delete)

export default routes
