import * as ProductController from '../controllers/productController'

const express = require('express')

const initProductRoutes = () => {
  const productRouter = express.Router()

  // post /create
  productRouter.post('/', ProductController.createProduct
  )

  // GET /deploy
  productRouter.get('/:id', ProductController.fetchProduct
  )

  // PUT /deploy
  productRouter.put('/', ProductController.updateProduct
  )

  // DELETE /deploy
  productRouter.delete('/', ProductController.deleteProduct
  )

  // GET /deploy
  productRouter.get('/list', ProductController.fetchProduct
  )

  return productRouter
}

module.exports = initProductRoutes
