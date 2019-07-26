import { Router } from 'express'
import Controllers from './controllers/index'
import AuthMiddleware from './middlewares/auth'

const routes = Router()

routes.post('/auth/register', Controllers.authController.register)
routes.post('/auth/authenticate', Controllers.authController.auth)

// Todas as rotas abaixo do middleware vão necessitar do Token
routes.get('/users', Controllers.userController.allUsers, routes.use(AuthMiddleware.authMiddleware))
routes.post('/deleteUser', Controllers.userController.delete)
routes.put('/update', Controllers.userController.update)

export default routes
