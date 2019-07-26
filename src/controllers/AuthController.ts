import { Request, Response } from 'express'
import User from '../schemas/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { secret } from '../config/authConfig'

// Função para gerar o token
const generateToken = (param = {}): jwt => {
  return jwt.sign(param, secret, {
    expiresIn: 86400
  })
}

export default class AuthController {
  // Função de registro de novo usuário
  public async register (req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    try {
      if (await User.findOne({ email })) { // Testando se o usuário não existe
        return res.status(400).send({ error: 'User already exists' })
      }
      // Encripitando a senha do usuário
      let password = req.body.password
      password = await bcrypt.hash(password, 10)
      req.body.password = password

      const user = await User.create(req.body) // Criar o usuário no bd

      user.password = undefined

      return res.send({ user, token: generateToken({ id: user._id }) })
    } catch (error) {
      return res.status(400).send({ error: 'Registration failed' })
    }
  }

  public async auth (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    // Caso do usuário não ser encontrado
    if (!user) return res.status(400).send({ error: 'User not found' })

    // Comparando a senha
    if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Invalid password' })

    user.password = undefined

    res.send({ user, token: generateToken({ id: user._id }) })
  }
}
