import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { config } from './config/app'
import { baseConfig } from '../ormconfig'
import { Item } from './entity/item'
import { Category } from './entity/category'
import { Stock } from './entity/stock'
import { Cart } from './entity/cart'
import { Order } from './entity/order'

import { addRecord } from './db'
import initRoutes from './routes/index'
import swaggerUi from 'swagger-ui-express'
const swaggerDocument = require('./swagger.json')
const app = express()
const PORT = config.get('app.port')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json());

(async () => {
  // for establish connection with database
  let typeormConnection = await createConnection({
    ...baseConfig,
    entities: [Item, Category, Stock, Cart, Order]
  })

  await addRecord({})
  await initRoutes(app)
  app.get('/', (req: any, res: any) => res.send('Hello World!'))
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
})()
