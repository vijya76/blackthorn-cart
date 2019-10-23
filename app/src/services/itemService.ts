import { getManager } from 'typeorm'
import { Item } from '../entity/item'

export class ItemService {
  getAllItems () {
    // get item repository and find all items
    return getManager().getRepository(Item).find()
  }

  saveItem (item: Item) {
    return getManager().getRepository(Item).save(item)
  }

  deleteItem (item: Item) {
    return getManager().getRepository(Item).remove(item)
  }

  getItemById (itemId: number) {
    return getManager().getRepository(Item).findOne(itemId)
  }
}
