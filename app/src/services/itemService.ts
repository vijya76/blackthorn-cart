import { getManager } from 'typeorm'
import { Item } from '../entity/item'

export class ItemService {
  async getAllItems (pageno: number) {
    const items = await getManager().getRepository(Item).find({ skip: (pageno - 1) * 5, take: 5 })
    for (var k in items) {
      items[k].categories = await getManager()
        .createQueryBuilder()
        .cache(60000)
        .relation(Item, 'categories')
        .of(items[k])
        .loadMany()
    }
    return items
  }

  saveItem (item: Item) {
    return getManager().getRepository(Item).save(item)
  }

  deleteItem (item: Item) {
    return getManager().getRepository(Item).remove(item)
  }

  async getItemById (itemId: number) {
    const item = await getManager().getRepository(Item).findOne(itemId)
    item.categories = await getManager()
      .createQueryBuilder()
      .cache(60000)
      .relation(Item, 'categories')
      .of(item)
      .loadMany()
    return item
  }
}
