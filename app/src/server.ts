import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { config } from './config/app'
import { baseConfig } from '../ormconfig'
import { Product } from './entity/product'
import { addRecord } from './db'

const app = express()
const PORT = config.get('app.port')

app.use(express.json());

(async () => {
  // for establish connection with database
  let typeormConnection = await createConnection({
    ...baseConfig,
    entities: [Product]
  })

  await addRecord({})

  app.get('/', (req, res) => res.send('Hello World!'))

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
})()
