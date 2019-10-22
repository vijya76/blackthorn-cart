import { getManager } from 'typeorm'
import { Product } from '../entity/product'

export class ProductService {
  getAllProducts () {
    // get product repository and find all products
    return getManager().getRepository(Product).find()
  }

  saveProduct (product: Product) {
    return getManager().getRepository(Product).save(product)
  }

  deleteProduct (product: Product) {
    return getManager().getRepository(Product).remove(product)
  }

  getProductById (productId: number) {
    return getManager().getRepository(Product).findOne(productId)
  }
}
