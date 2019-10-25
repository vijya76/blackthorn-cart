import { getManager, Like } from 'typeorm'
import { Item } from '../entity/item'
import { Category } from '../entity/category'

export class ItemService {
  async getAllItems(pageno: number, name: string, category: string) {
    let items
    if (name != null || name != undefined || category != null || category != undefined) {
      if (name != null || name != undefined) {
        items = await getManager().getRepository(Item).find({ where: { 'name': Like('%' + name + ' #%') }, skip: (pageno - 1) * 5, take: 5 })
      }
      const subquery = await getManager()
        .createQueryBuilder(Item, 't1')
        .innerJoin(Category, 't2', '"t1".g = "t2".category_id ')
        .where('"t4".k = 4 AND ("t6".i = 2 OR ("t6".i = 1 AND "t6".j = 1))')
        .getMany()
    } else {
      items = await getManager().getRepository(Item).find({ skip: (pageno - 1) * 5, take: 5 })
    }
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

  saveItem(item: Item) {
    return getManager().getRepository(Item).save(item)
  }

  deleteItem(item: Item) {
    return getManager().getRepository(Item).remove(item)
  }

  async getItemById(itemId: number) {
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
