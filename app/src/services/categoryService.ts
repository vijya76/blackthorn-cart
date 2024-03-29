import { getManager } from 'typeorm'
import { Category } from '../entity/category'

export class CategoryService {
  getAllCategorys () {
    // get category repository and find all categorys
    return getManager().getRepository(Category).find({ cache: 60000 })
  }

  saveCategory (category: Category) {
    return getManager().getRepository(Category).save(category)
  }

  deleteCategory (category: Category) {
    return getManager().getRepository(Category).remove(category)
  }

  getCategoryById (categoryId: number) {
    return getManager().getRepository(Category).findOne({ where: { 'category_id': categoryId }, cache: 60000 })
  }
}
