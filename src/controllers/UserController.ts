import { Request, Response } from 'express'
import User from '../schemas/User'

export default class UserController {
  public async allUsers (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const id = await User.find()
    req.body._id = id.length < 1 ? 1 : id.length
    const user = await User.create(req.body)

    return res.json(user)
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const id = req.body._id

    const user = await User.findByIdAndRemove(id)

    return res.json(user)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const params = req.params
    const user = await User.updateMany({ ...params }, { $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    } })
    return res.json(user)
  }
}
