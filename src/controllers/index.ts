import AuthController from './AuthController'
import UserController from './UserController'

// Classe para instânciar todos os controllers
class Controllers {
    public authController = new AuthController()

    public userController = new UserController()
}

export default new Controllers()
