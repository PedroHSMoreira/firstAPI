import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { secret } from '../config/authConfig'

class AuthMiddleware {
  public async authMiddleware (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).send({ error: 'No token provided' })

    const parts = authHeader.split(' ')

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformation' })

    jwt.verify(token, secret, (err, decoded): Response | void => {
      if (err) return res.status(401).send({ error: 'Token invalid' })

      req.userId = decoded.id

      return next()
    })
  }
}

export default new AuthMiddleware()
