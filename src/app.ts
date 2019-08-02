import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.database()
      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json()) // Utilizar o json no express
      this.express.use(cors())
    }

    private database (): void {
      mongoose.connect('mongodb://localhost:32768/tsnode', {
        useNewUrlParser: true // Aceitando novo formato de URL
      })
      mongoose.set('useCreateIndex', true)
    }

    private routes (): void {
      this.express.use(routes) // Utilizando as rotas
    }
}

export default new App().express
