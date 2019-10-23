import { getConnection } from 'typeorm'
import { Item } from './entity/item'

const addRecord = async (requestData: any): Promise<object> => {
  let item = new Item()
  item.name = 'Test'
  item.price = 10.0

  const connection = await getConnection()
  return connection.manager.save(item)
}

const getRecordById = async (id: any) => {
  const connection = await getConnection()
  const repository = await connection.getRepository(Item)
  const { rows, totalCount } = await repository.findAndCount({
    order: { created_at: 'DESC' },
    take: 1
  })
  return [rows, totalCount]
}

export { addRecord, getRecordById }
