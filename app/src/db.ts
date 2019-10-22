import { getConnection } from 'typeorm'
import { Product } from './entity/product'

const addRecord = async (requestData: any): Promise<object> => {
  let product = new Product()
  product.name = 'Test'
  product.cost = 10.0

  const connection = await getConnection()
  return connection.manager.save(product)
}

const getRecord = async () => {
  const connection = await getConnection()

  const repository = await connection.getRepository(Product)
  const [rows, totalCount] = await repository.findAndCount({
    order: { created_at: 'DESC' },
    take: 1
  })

  return [rows, totalCount]
}

export { addRecord, getRecord }
